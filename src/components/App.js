import { Tabs, Tab } from 'react-bootstrap'
import bTroll from '../abis/bTroll.json'
import React, { Component } from 'react';
import btroll from '../Troll.png';
import Web3 from 'web3';
import './App.css';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData(this.props.dispatch)
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData(dispatch) {
    if(typeof window.ethereum!=='undefined'){
      const web3 = new Web3(window.ethereum)
      const netId = await web3.eth.net.getId()
      const accounts = await web3.eth.getAccounts()
      

      //load balance
      if(typeof accounts[0] !=='undefined'){
        const balance = await web3.eth.getBalance(accounts[0])
        this.setState({account: accounts[0], balance: balance, web3: web3})
      } else {
        window.alert('Please login with MetaMask')
      }

      //load contracts
      try {
        //const token = new web3.eth.Contract(Token.abi, Token.networks[netId].address)
        const bTroll = new web3.eth.Contract(bTroll.abi, bTroll.networks[netId].address)
        const trollBridgeAddress = bTroll.networks[netId].address
        this.setState({bTroll: bTroll, trollBridgeAddress: trollBridgeAddress})
      } catch (e) {
        console.log('Error', e)
        //window.alert('Contracts not deployed to the current network')
      }

    } else {
      window.alert('Please install MetaMask')
    }
  }


  async deposit(amount) {
    if(this.state.bTroll!=='undefined'){
      try{
        await this.state.bTroll.methods.deposit().send({value: amount.toString(), from: this.state.account})
      } catch (e) {
        console.log('Error, deposit: ', e)
      }
    }
  }
 

  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      token: null,
      bTroll: null,
      balance: 0,
      trollBridgeAddress: null
    }
  }

  render() {
    return (
      <div className='text-monospace'>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            target="_blank"
            rel="noopener noreferrer"
          >
        <img src={btroll} className="App-logo" alt="logo" height="32"/>
          <b> Bridge Troll</b>
        </a>
        </nav>
        <div className="container-fluid mt-5 text-center">
        <br></br>
          <img className="photo" src={btroll} />
        <br></br>
          <h1>Bridge Troll</h1>
          <h4>Your Gateway to Layer 2</h4>
          
          
          <br></br>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="deposit" title="Bridge">
                  <div>
                  <br></br>
                  <p>Connected account: {this.state.account}</p>
                  <br></br>
                    Please deposit 0.001 ETH
                    <br></br>
                    You will receive 0.5 FTM on the Opera Network
                    <br></br>
                    <br></br>
                    
                    <button 
                    className='btn btn-success' 
                    onClick={(e) => {

                    }}>
                    Deposit
                    </button>
                  </div>
                </Tab>
              </Tabs>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
