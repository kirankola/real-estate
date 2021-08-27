// migrating the appropriate contracts
var SquareVerifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const proofs= require('../../zokrates/code/square/proof.json');
module.exports = async function (deployer, network, accounts) {

/*
 proof.A,
      proof.A_p,
      proof.B,
      proof.B_p,
      proof.C,
      proof.C_p,
      proof.H,
      proof.K,
      input
*/

 await  deployer.deploy(SquareVerifier)
 const SquareVerifierInsance=await SquareVerifier.deployed() 
 await deployer.deploy(SolnSquareVerifier, SquareVerifierInsance.address)
 const SolnSquareVerifierInstance=await SolnSquareVerifier.deployed()
 // mint 10 Nfts
  for(let i=1;i<11;i++){
  await  SolnSquareVerifierInstance.mintNewToken(
  accounts[0],
  i,
 proofs[i].proof.a,

 proofs[i].proof.b,

 proofs[i].proof.c,
  
 proofs[i].inputs) 
 }
 
 
 
 
  
     

};

