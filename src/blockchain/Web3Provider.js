import Web3, { providers } from 'web3';
import Geth from 'react-native-geth';

const blockchainUrl = 'http://ec2-52-199-0-93.ap-northeast-1.compute.amazonaws.com:8545/';

export const web3 = new Web3(new providers.HttpProvider(blockchainUrl));

// Custom Ethereum Network
const PrivateEth = async () => {
  // Network ID
  const networkID = 1;
  // Chain ID
  const chainID = 17;
  // genesis.json
  const genesis = `{
    "config": {
      "chainId": ${chainID},
      "homesteadBlock": 0,
      "eip155Block": 0,
      "eip158Block": 0
    },
    "difficulty": "20",
    "gasLimit": "10000000",
    "alloc": {}
  }`;

  const config = {
    networkID,
    maxPeers: 2,
    genesis,
    nodeDir: '.private-ethereum',
    keyStoreDir: 'keystore',
    enodes: 'enode://XXXX@52.199.0.93:30303'
  }; // --networkid / Network identifier (integer, 0=Olympic (disused), 1=Frontier, 2=Morden (disused), 3=Ropsten) (default: 1) // --maxpeers / Maximum number of network peers (network disabled if set to 0) (default: 25) // genesis.json file // --datadir / Data directory for the databases and keystore // --keystore / Directory for the keystore (default = inside the datadir) // --bootnodes / Comma separated enode URLs for P2P discovery bootstrap

  const geth = new Geth(config);
  // start node
  const start = await geth.start();

  if (start) {
    console.log('Start :', start);
    // const stop = await geth.stop();
    // console.log('Stop :', stop);
  }
};

PrivateEth();
