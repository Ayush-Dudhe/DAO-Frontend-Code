import React, { useState } from 'react'
import Web3 from 'web3';
import './nftCard.css'
import GovernanceTokenJson from '../../utils/GovernanceToken.json'
import TreasuryJson from '../../utils/Treasury.json'
import AddressJson from '../../utils/Address.json'
import AntPicOne from '../../../assets/AntPicOne.jpg'
import AntPicTwo from '../../../assets/AntPicTwo.jpg'
import ImageDisplay from '../../threeD/ImageLoder';

export const NftCard = ({nftValue, price}) => {

  const [sold, setSold] = useState(false);

  var web3 = new Web3("http://127.0.0.1:8545/");
  console.log('Token abi', GovernanceTokenJson['abi'])
  var myContract = new web3.eth.Contract(GovernanceTokenJson['abi'], AddressJson['governanceTokenAddress'], {
    from: AddressJson['userAddress'], // default from address
    gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
  });

  const checkVotes = (userAddress) => {
    myContract.methods.getVotes(userAddress).call().then((res) => {
      console.log('Get votess ',res)
    })
  }

  const selfDelegate = (userAddress) => {
    myContract.methods.delegate(userAddress).send().then((res) => {
      console.log('delegated member ',res)
      checkVotes(userAddress)
    })
  }



  var ethPrice = web3.utils.fromWei(price.toString(),'ether')
  const sendTransaction = () => {
    web3.eth.sendTransaction({
      from: AddressJson['userAddress2'],
      to: AddressJson['treasuryAddress'],
      value: price
    })
    .then(function(receipt){
      console.log('send money ',receipt)
      web3.eth.getBalance(AddressJson['userAddress2']).then(res => {
        console.log('the remainder balance', res)
      })
    });
  }

  const buyNft = (nftId) => {
    console.log('inside buy nft',nftId)
    myContract.methods.mintNFT(AddressJson['userAddress2'], nftId).send().then(res => {
      console.log('NFT minted',res)
      sendTransaction()
      selfDelegate(AddressJson['userAddress2'])
      setSold(true)
    })
  }

  myContract.methods.ownerOf(nftValue).call().then(res => {
    console.log('owner of',nftValue,res)
    setSold(true)
  }).catch(error => {
            console.error('errorn in ',nftValue)
            setSold(false)
          })

 



  const nftJson = {
    "1": {
      "name": "Devil1",
      "uri": "https://mudemo.infura-ipfs.io/ipfs/QmPCg6s6BGGXi5qYrk99mF1Gp85M9WgUVuEvotRMh35xSX"
    },
    "2": {
      "name": "Devil2",
      "uri": "https://mudemo.infura-ipfs.io/ipfs/QmXeweqRQH966zjxohKmBe2LFqgxBBNzAkckvJgLWXNKHC"
    },
    "3": {
      "name": "Devil3",
      "uri": "https://mudemo.infura-ipfs.io/ipfs/QmWPo2mk289RodAdeA4HCLtjeu2PC776YCdWV6M5AgRmoS"
    },
    "4": {
      "name": "Devil4",
      "uri": "https://mudemo.infura-ipfs.io/ipfs/QmS2bwJatg7cAE3gs1KUCBbC8ZVJmSYvL9JkKJ9RUh89EE"
    },
    "5": {
      "name": "Devil5",
      "uri": "https://mudemo.infura-ipfs.io/ipfs/Qmapw5Fu3tGjrRD6DG2A98upy2FhqfZZ6Jbp1v6NSw7zgp"
    }
  }

    const nftKeys = Object.keys(nftJson)
    console.log('keyss', nftKeys)
    
  return (
    <div className='nftMainCard'>
        <div className='nftDetailsSection'>
            <div className='nftCardTitle'>
                {nftJson[nftValue]['name']}
            </div>
           <div
                style={{
                  height: "400px",
                  width: "185px",
                  borderRadius: "300px",
                }}
              >
                <ImageDisplay
                  imgpath=
                    {nftJson[nftValue]['uri']}
                />
              </div>
            <div>
              Amount {ethPrice}
            </div>
            {
              !sold ? 
              <div class="button-91" onClick={() => buyNft(nftValue)}>
                Buy NFT
              </div> : 
              <div>
                Sold
              </div>
            }
            
        </div>
    </div>
  )
}

