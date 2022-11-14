/* tslint:disable */

export interface ABCIResponseParsed {
  Provider: string;
  Address: string;
  Version: string;
  "Latest Block": string;
  "Latest Hash": string;
}

export interface ABCIResponse {
  jsonrpc: string;
  id: number;
  result: {
    response: {
      data: string;
      version: string;
      last_block_height: string;
      last_block_app_hash: string;
    };
  };
}

/**
 * Cosmos Chain.json is a metadata file that contains information about a cosmos sdk based chain.
 */
export interface CosmosChain {
  chain_name: string;
  chain_id: string;
  pretty_name?: string;
  website?: string;
  update_link?: string;
  status?: "live" | "upcoming" | "killed";
  network_type?: "mainnet" | "testnet" | "devnet";
  bech32_prefix: string;
  daemon_name?: string;
  node_home?: string;
  key_algos?: ("secp256k1" | "ethsecp256k1" | "ed25519" | "sr25519")[];
  slip44?: number;
  fees?: {
    fee_tokens?: FeeToken[];
    [k: string]: unknown;
  };
  staking?: {
    staking_tokens?: StakingToken[];
    [k: string]: unknown;
  };
  codebase?: {
    git_repo?: string;
    recommended_version?: string;
    compatible_versions?: string[];
    binaries?: {
      "linux/amd64"?: string;
      "linux/arm64"?: string;
      "darwin/amd64"?: string;
      "darwin/arm64"?: string;
      "windows/amd64"?: string;
      [k: string]: unknown;
    };
    genesis?: {
      name?: string;
      genesis_url: string;
      [k: string]: unknown;
    };
    cosmos_sdk_version?: string;
    tendermint_version?: string;
    cosmwasm_version?: string;
    cosmwasm_enabled?: boolean;
    ibc_go_version?: string;
    /**
     * List of IBC apps (usually corresponding to a ICS standard) which have been enabled on the network.
     */
    ics_enabled?: ("ics20-1" | "ics27-1" | "mauth")[];
    versions?: {
      /**
       * Official Upgrade Name
       */
      name: string;
      /**
       * Git Upgrade Tag
       */
      tag?: string;
      /**
       * Block Height
       */
      height?: number;
      /**
       * [Optional] Name of the following version
       */
      next_version_name?: string;
      [k: string]: unknown;
    }[];
    [k: string]: unknown;
  };
  peers?: {
    seeds?: Peer[];
    persistent_peers?: Peer[];
    [k: string]: unknown;
  };
  apis?: {
    rpc?: Endpoint[];
    rest?: Endpoint[];
    grpc?: Endpoint[];
    [k: string]: unknown;
  };
  explorers?: Explorer[];
  [k: string]: unknown;
}
export interface FeeToken {
  denom: string;
  fixed_min_gas_price?: number;
  low_gas_price?: number;
  average_gas_price?: number;
  high_gas_price?: number;
  [k: string]: unknown;
}
export interface StakingToken {
  denom: string;
  [k: string]: unknown;
}
export interface Peer {
  id: string;
  address: string;
  provider?: string;
  [k: string]: unknown;
}
export interface Endpoint {
  address: string;
  provider?: string;
  archive?: boolean;
  [k: string]: unknown;
}
export interface Explorer {
  kind?: string;
  url?: string;
  tx_page?: string;
  account_page?: string;
  [k: string]: unknown;
}
