// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FundMe {
    mapping(address => uint256) private addressToDepositedAmount;
    event FundsDeposited(address indexed addressOfDepositer, uint256 amountDeposited);
    event FundsWithdrawned(address addressOfWithdrawer, uint256 amountWithdrawned);

    constructor () {}

    function deposit() public payable {
        addressToDepositedAmount[msg.sender] += msg.value;
        emit FundsDeposited(msg.sender, msg.value);
    }

    function getDepositedAmount(address _addressToCheck) public view returns(uint256) {
        return addressToDepositedAmount[_addressToCheck];
    }

    function withdrawn() public {
        uint256 amountToWithdraw = addressToDepositedAmount[msg.sender];
        payable(msg.sender).transfer(amountToWithdraw);
        addressToDepositedAmount[msg.sender] = 0;
        emit FundsWithdrawned(msg.sender, amountToWithdraw);
    }
}