import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css'
import logo from './assets/ethereum.png'

function App() {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const { ethereum } = window;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
 
  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);

      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  }

  return (
    // <div className="App-container">
      <header>
        {haveMetamask ? (
          <div className="App-header">
            {isConnected ? (
              <div className="card">
                <div className="card-row">
                  <h3>Wallet Address:</h3>
                  <p className='balance'>
                    {accountAddress}  
                  </p>
                </div>
                <div className="card-row">
                  <h3>Wallet Balance:</h3>
                  <p>{accountBalance}</p>
                </div>
              </div>
            ) : (
              <div className='logo-box'>
              <img src={logo} className="App-logo" alt="logo" />
              </div>
            )}
              <h1 className= "app-name">A decentralized Ethereum Application</h1>
            {isConnected ? (
              <p className="info">🎉 Connected Successfully!!!</p>
            ) : (
              <button className="btn" onClick={connectWallet}>
                Connect
              </button>
            )}
          </div>
        ) : (
          <p>Please Install MataMask</p>
        )}
      </header>
    // </div>
  );
}
export default App;