//pragma solidity >=0.4.21 <0.6.0;
pragma solidity ^0.5.2;

import  'openzeppelin-solidity/contracts/utils/Address.sol';
import './ERC721Mintable.sol';
import "./Verifier.sol";


// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

contract SquareVerifier is Verifier {
} 

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

contract SolnSquareVerifier is RealEstateERC721Token {
Verifier private verifier;
// TODO define a solutions struct that can hold an index & an address

 struct Solution {
         uint index;
        address solvedBy;
    }

 constructor (address verifier_address) public {
        verifier = Verifier(verifier_address);
    }   


// TODO define an array of the above struct

Solution[] private solutions;


// TODO define a mapping to store unique solutions submitted

 mapping(bytes32 => Solution) private uniqueSolutions;



// TODO Create an event to emit when a solution is added

event SolutionAdded(uint index, address solvedBy);






// TODO Create a function to add the solutions to the array and emit the event

  function addSolution(uint index, address solvedBy, bytes32 keyHash) public
    {
        Solution memory solution = Solution(index, solvedBy);
        solutions.push(solution);
        uniqueSolutions[keyHash] = solution;

        emit SolutionAdded(index, solvedBy);
    }
    
   // uttility functions
   
   function getKeyHash
    (
        uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c, uint[2] memory input
    )
    public pure returns(bytes32)
    {
        return keccak256(abi.encodePacked(a, b, c,  input));
    } 

// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly


function mintNewToken
    (
        address to,
        uint tokenId,
        uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c, uint[2] memory input
    )
    public
     
    {
       // solution hash key
        bytes32 hashKey = getKeyHash(a, b, c,  input);
        // verification value
        bool verified = verifier.verifyTx(a, b, c,  input);
        //verifiction check
        require(verified, "Solution not verified  ");
        // make sure it is unique
        require(uniqueSolutions[hashKey].solvedBy == address(0),"Solution is not unique ,used before ");
        //add  solution 
        addSolution(tokenId, to, hashKey);
        //mint tokenid 
        super.mint(to, tokenId);
    }


}


  


























