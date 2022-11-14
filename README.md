# Secret Testnet Node Status Monitor
Simple script to loop requests to nodes registerd on [Cosmos Chain Registry](https://github.com/cosmos/chain-registry/). Retrieves binary version, block height, and hash using rpc's `abci_info` endpoint.

## Requires
- node.js

## Installation
```bash
$ git clone https://github.com/apollo-othermike/secret-testnet-node-status
$ cd secret-testnet-node-status
$ npm yarn install
```

## Run
```bash
yarn start
```