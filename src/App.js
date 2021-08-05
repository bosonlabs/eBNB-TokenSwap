import React, { Component } from 'react';
import token from './token';
import web3 from  './web3';


class App extends Component {
 state = { 
     name: '',
     symbol: '',
     _totalSupply: '',
     decimals: '',
     balanceOf: '',
     balances: '',
     value: '',
     message: ''
  };
 
async componentDidMount() {
  const name = await token.methods.name().call();
  this.setState({ name });
  const symbol = await token.methods.symbol().call();
  this.setState({ symbol });
  const _totalSupply = await token.methods._totalSupply().call();
  this.setState({ _totalSupply });
  const decimals = await token.methods.decimals().call();
  this.setState({ decimals });
  
  const balances = await token.methods.balanceOf('0xA751637E51002580F6eBca6587284fA73b61DE49').call({
    from: '0xA3518CA0656aAde153fd134D5d944A5394A12dcD'
  });
  this.setState({ balances });
 
}



onSubmit = async(event) => {
  event.preventDefault();
  
  var account;

web3.eth.getAccounts(function(err, accounts) {
  if (err != null) {
    alert("Error retrieving accounts.");
    return;
  }
  if (accounts.length == 0) {
    window.ethereum.enable();
    alert("No account found! Make sure the Ethereum client is configured properly.");
    return;
  }
  account = accounts[0];
  console.log('Account: ' + account);
  web3.eth.defaultAccount = account;
});
   
  
   
  
  

this.setState({ message:'waiting on transaction sucess...'});
  
   const accounts = await web3.eth.getAccounts();
   console.log(accounts);
    await token.methods.transfer("0xA91FAB9c14e4B5A5D6bFB13E3aD6fe8A617aDBa6",(this.state.value)).send({
      from:'0xA751637E51002580F6eBca6587284fA73b61DE49',
      value:(this.state.value)
    });

  this.setState({ message:'transferred successfully'});
};



 render() {
    return (
      <div>

         <h1>ERC20 Token</h1><br />
       
         <h3>  name : {this.state.name} </h3>
         <h3>  symbol : {this.state.symbol}</h3>
         <h3>  _totalSupply : {this.state._totalSupply}</h3>
         <h3>  decimals : {this.state.decimals}</h3>
       
         <hr />
        
        <form onSubmit={this.onSubmit}>
        
          <h1>Transfer token</h1>
          <h3>Initial Account balance : {this.state.balances} </h3>
       
         
          <label>enter amount of token to send : 
          <input type="text" value={this.state.value} 
          onChange={ event => this.setState({value: event.target.value})} />
          </label>
        
          
         
          <button>Transfer</button>

          
        </form>
      <h3>{this.state.message}</h3>
      </div>

     
    );
  }
  
}

export default App;
