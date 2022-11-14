import request from "axios";
import {
  CosmosChain,
  Endpoint,
  ABCIResponse,
  ABCIResponseParsed,
} from "./types";
import Table from "cli-table";

// run main script
// get chain data
// add remote chains to static list
// render info
const main = async () => {
  console.log("results at:", new Date().toISOString());
  // manually add your own endpoints here.
  let endpoints: Endpoint[] = [
    {
      address: "https://secret-testnet-rpc.apollo.farm",
      provider: "Apollo",
      archive: false,
    },
  ];

  // fetch chain info from https://github.com/cosmos/chain-registry/
  const fetch_chain = async () => {
    const res = await request.get<CosmosChain>(
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/pulsar/chain.json"
    );

    if (!res.data) {
      return {} as CosmosChain;
    }

    return res.data;
  };

  // render table (for cli)
  const render_table = (responses: ABCIResponseParsed[]) => {
    const table = new Table({
      head: Object.keys(responses[0]),
    });

    for (const r in responses) {
      table.push([
        responses[r]["Provider"],
        responses[r]["Address"],
        responses[r]["Version"],
        responses[r]["Latest Block"] || "---",
        responses[r]["Latest Hash"] || "---",
      ]);
    }

    console.log(table.toString());
  };

  const chain_config = await fetch_chain();

  if (!chain_config.apis) {
    console.log("no apis found");
    return false;
  }

  if (!chain_config.apis.rpc) {
    console.log("no rpcs found");
    return false;
  }

  chain_config.apis.rpc.forEach((r: Endpoint, i: number) => {
    endpoints.push(r);
  });

  const statuses: Promise<ABCIResponse>[] = endpoints.map(
    async (e: Endpoint, i: number) => {
      try {
        const response = await request.get<ABCIResponse>(
          e.address + "/abci_info"
        );
        return response.data;
      } catch (e) {
        return {} as ABCIResponse;
      }
    }
  );

  const parsed_responses: ABCIResponseParsed[] = [];

  Promise.all(statuses).then((values) => {
    for (const v in values) {
      if (values[v].result.response) {
        parsed_responses.push({
          Provider: endpoints[v].provider || "---",
          Address: endpoints[v].address,
          Version: values[v].result.response.version,
          "Latest Block": values[v].result.response.last_block_height,
          "Latest Hash": values[v].result.response.last_block_app_hash,
        });
      }
    }
    // add additional renders/returns here for web api
    if (parsed_responses.length > 0) render_table(parsed_responses);
  });
};

const loop = () => {
  setInterval(main, 10000);
};

main();
loop();
