const HDWalletProvider = require("truffle-hdwallet-provider");
const fs = require('fs');
const MNEMONIC = fs.readFileSync(__dirname+"/.secret").toString().trim();
const web3 = require("web3");
const NODE_API_KEY = "c51b6a1362624e5784213b11bb4555b7"
const isInfura = true;
const NFT_CONTRACT_ADDRESS = "0xe8429Edf9c78F6F61aa0000685FcCC4914894588";
const OWNER_ADDRESS = "0x04659e73c4eC044d079f0bA72fC216A9B94857d5";
const NETWORK = "rinkeby";
const NUM_TOKENS = 10;
const proofs = require('../zokrates/code/square/proof.json')
if (!MNEMONIC || !NODE_API_KEY || !OWNER_ADDRESS || !NETWORK) {
  console.error(
    "Please set a mnemonic, Alchemy/Infura key, owner, network, and contract address."
  );
  return;
}

const NFT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256[2]",
        "name": "a",
        "type": "uint256[2]"
      },
      {
        "internalType": "uint256[2][2]",
        "name": "b",
        "type": "uint256[2][2]"
      },
      {
        "internalType": "uint256[2]",
        "name": "c",
        "type": "uint256[2]"
      },
      {
        "internalType": "uint256[2]",
        "name": "input",
        "type": "uint256[2]"
      }
    ],
    "name": "mintNewToken",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]


async function main() {
  const network =
    NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";
  const provider = new HDWalletProvider(
    MNEMONIC,
    isInfura
      ? "https://" + network + ".infura.io/v3/" + NODE_API_KEY
      : "https://eth-" + network + ".alchemyapi.io/v2/" + NODE_API_KEY
  );
  const web3Instance = new web3(provider);

  if (NFT_CONTRACT_ADDRESS) {
    let nftContract = null;
    try{
      nftContract = new web3Instance.eth.Contract(
        NFT_ABI,
        NFT_CONTRACT_ADDRESS,
        { gasLimit: "1000000" }
      );
    }
    catch(e){
      console.log('Could not create contract.')
    }
    

    // Creatures issued directly to the owner.
    for (var i = 5; i < 11; i++) {
      // read proof
       
      let proof = proofs[i];
      const result = await nftContract.methods
        .mintNewToken(OWNER_ADDRESS, i, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs)
        .send({ from: OWNER_ADDRESS });
      console.log("Minted token. Transaction: " + result.transactionHash);
    }
    delete nftContract;
  } else {
    console.error(
      "Define NFT_CONTRACT_ADDRESS."
    );
  }
  provider.engine.stop();
  return;
}

main();
