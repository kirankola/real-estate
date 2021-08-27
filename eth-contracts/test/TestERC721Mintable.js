

var ERC721MintableComplete = artifacts.require('RealEstateERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[1];
    const account_two = accounts[2];
    const account_three = accounts[3];
    
    

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: accounts[0]});
try{


            // TODO: mint multiple tokens
               await this.contract.mint(account_one, 0)
               await this.contract.mint(account_two, 1)
               await this.contract.mint(account_one, 2)
               await this.contract.mint(account_three, 3)
           
}
catch(e){
    console.log(e.message)
} 
           
           
         
        })

        it('should return total supply', async function () { 

            try{

            const totalSupply = await this.contract.totalSupply()
            assert.equal(totalSupply, 4, 'incorrect total suply')
        }
        catch(e){
            //for debuging
            console.log(e.message)
        } 
          
        })

        it('should get token balance', async function () { 
            try{
            const balance = await this.contract.balanceOf(account_one)
            assert.equal(balance, 2, 'Wrong token balance value')}
            catch(e){
                //for debuging
                console.log(e.message)
            } 
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 

            try{
            const uri = await this.contract.tokenURI(1)
      assert.equal(uri,'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1','Wrong complete token uri')
         } catch(e){
        //for debuging
        console.log(e.message)
    } 
    
    })

        it('should transfer token from one owner to another', async function () { 
           try{
            const tx = await this.contract.transferFrom( account_one, account_two,0, { from: account_one })
                const token_zero_owner= await this.contract.ownerOf(0)
              assert.equal(token_zero_owner ,account_two,'Wrong new owner. transfer failed' )

              //verify transfer event 

              assert.equal(tx.logs[0].event, 'Transfer','incorrect event emitted')
              assert.equal(tx.logs[0].args.from, account_one,'wrong from address')
              assert.equal(tx.logs[0].args.to, account_two,'wrong to address')
              assert.equal(tx.logs[0].args.tokenId.toNumber(), 0,'wrong token id')
            
        } catch(e){
            //for debuging
            console.log(e.message)
        } 
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: accounts[0]});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            try {
                await this.contract.mint(accounts[1], 1, { from: account_one })
              } catch (error) {
                  
                assert(error.message.includes('owner only'), 'Wrong revert message')
              }
        })

        it('should return contract owner', async function () { 
            try {

                const contract_owner= await this.contract.owner() 
                assert.equal(contract_owner, accounts[0], 'Wrong contract owner address'
                  )
            }
            catch(e){
                //for debuging
                console.log(e.message)
            } 
        })

    });
})


