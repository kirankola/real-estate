const Verifier = artifacts.require('Verifier')
const SolnSquareVerifier = artifacts.require('SolnSquareVerifier')

contract('SolnSquareVerifier', accounts => {

    const proofs = require('../../zokrates/code/square/proof.json')

    const account_one = accounts[1];
    const account_two = accounts[2];
     
    beforeEach(async () => {
        try {
            verifier = await Verifier.new({ from: accounts[0] })
            this.contract = await SolnSquareVerifier.new(verifier.address, { from: accounts[0] })
        }
        catch (e) {
            console.log(e.message)
        }

    })
    // Test if a new solution can be added for contract - SolnSquareVerifier


    it('Test if a new solution can be added for contract - SolnSquareVerifier', async () => {

        try {

            //console.log(proofs["1"])
            const result = await this.contract.getKeyHash(
                proofs[10].proof.a,
            
                proofs[10].proof.b,
        
                proofs[10].proof.c,
        
                proofs[10].inputs
            )

            const tx = await this.contract.addSolution(0, account_two, result)

          

            assert.equal(tx.logs[0].event, 'SolutionAdded', 'incorrect event emitted')
            assert.equal(tx.logs[0].args.index.toNumber(), 0, 'wrong index')
            assert.equal(tx.logs[0].args.solvedBy, account_two, 'wrong solvedby address')

        }
        catch (e) {
            console.log(e.message)
        }


    })



    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier


    it(' Test if an ERC721 token can be minted for contract - SolnSquareVerifier', async () => {

     

            const tx = await this.contract.mintNewToken(account_one, 0,
            
                proofs["5"].proof.a,
            
                proofs["5"].proof.b,
        
                proofs["5"].proof.c,
                
                proofs["5"].inputs, { from: accounts[0] })

            assert(tx, "Token not mintted")



            assert.equal(tx.logs[1].event, 'Transfer', 'incorrect event emitted')
            assert.equal(tx.logs[1].args.tokenId.toNumber(), 0, 'wrong Token Id')
            assert.equal(tx.logs[1].args.from, '0x0000000000000000000000000000000000000000', 'wrong  from address(0)')
            assert.equal(tx.logs[1].args.to, account_one, 'wrong  to address')


        
 

    })



})


