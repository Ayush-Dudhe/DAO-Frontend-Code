import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import ModelViewer from "../threeD/Modelrenderer";
import { Navbar } from "../shared/Navbar/Navbar";
import Web3 from 'web3';
import GovernanceTokenJson from '../utils/GovernanceToken.json'
import AddressJson from '../utils/Address.json'
import "./delegatePage.css";

export const Delegatepage = () => {
  //   const navigate = useHistory();
  const [Address, setAddress] = useState("");
  const [Ether, setEther] = useState(0);
  const [Description, setDescription] = useState("");
  //   const [Data, setData] = useState("");
  const [Loading, setLoading] = useState(false);


  var web3 = new Web3("http://127.0.0.1:8545/");
  console.log('Token abi', GovernanceTokenJson['abi'])
  var myContract = new web3.eth.Contract(GovernanceTokenJson['abi'], AddressJson['governanceTokenAddress'], {
    from: AddressJson['userAddress2'], // default from address
    gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
  });

  const checkVotes = (userAddress) => {
    myContract.methods.getVotes(userAddress).call().then((res) => {
      console.log('Get votess ',res)
    })
  }

  const delegateUser = (userAddress) => {
    console.log('user adrressss', userAddress ,'address 2',AddressJson['userAddress'])
    myContract.methods.delegate(userAddress).send().then((res) => {
      console.log('delegated member ',res)
      checkVotes(userAddress)
    })
  }

  const handleAddress = async (e) => {
    e.preventDefault();
    setAddress(e.target.value);
    console.log(Address);
  };

  const handleEther = (e) => {
    e.preventDefault();
    setEther(e.target.value);
  };

  const handleDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <>
    <Navbar />
      <div className="formTitle">
      <h1>
      <span>DELE</span>GATE <span>ADDRESS</span>
      </h1>
      </div>
      <div className="detailsBox" >
        <div className='proposal'>
          <div className="formProposal">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label onChange={handleAddress}>Address to Delegate</label>
                <input
                  placeholder="Receiver address"
                  className="form-control"
                  style={{
                    borderColor: "#2d2d2d",
                    backgroundColor: "light-blue",
                    
                  }}
                  value={Address}
                  onChange={handleAddress}
                  required={true}
                />
              </div>
              { Address !== "" ? (
                <div>
                  <button className="btn btn-dark btn-lg btn-block" onClick={() => delegateUser(Address)}
                  style={{ background: "radial-gradient(523px at 7.1% 19.3%, rgb(147, 15, 255) 2%, rgb(5, 49, 255) 100.7%)" }}>
                    Delegate</button>
                </div>
              ) : (
                <p></p>
              )}
            </form>
            {/* <p>{Data}</p> */}
          </div>
        </div>
        <div id="threedcomp">
          <ModelViewer scale="0.09" modelPath={"minecraft4.glb"} />
        </div>
      </div>
    </>
  );
};


export default Delegatepage;
