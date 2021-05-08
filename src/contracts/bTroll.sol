// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;


contract bTroll {


  mapping(address => uint) public depositStart;
  mapping(address => uint) public etherBalanceOf;

  mapping(address => bool) public isDeposited;

  event Deposit(address indexed user, uint etherAmount, uint timeStart);

  //deposit will be on ETH side
  function deposit() payable public {
    require(isDeposited[msg.sender] == false, 'Error, deposit already active');
    require(msg.value==1e17, 'Error, deposit must be = 0.001 ETH');

    etherBalanceOf[msg.sender] = etherBalanceOf[msg.sender] + msg.value;
    depositStart[msg.sender] = depositStart[msg.sender] + block.timestamp;

    isDeposited[msg.sender] = true; //activate deposit status
    emit Deposit(msg.sender, msg.value, block.timestamp);
  }
  
}
