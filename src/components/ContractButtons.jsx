import { useState } from 'react';
import { ethers } from 'ethers';
import FundMe from '../../artifacts/contracts/FundMe.sol/FundMe.json';

const contractAddress = '0xf0D9b2786a02A3661c7aD9a8089c0dB3347c1De3';
// provider is connection to the Etherum network
const provider = new ethers.providers.Web3Provider(window.ethereum);
// get the end user private key
const signer = provider.getSigner();
// get the smart contract
const contract = new ethers.Contract(contractAddress, FundMe.abi, signer);
// Action when event is emitted.
contract.on("FundsDeposited", (addressOfDepositer, amountDeposited) => {
    alert("Address " + addressOfDepositer + " deposited " + parseInt(amountDeposited._hex) / 10**18 + " ETH");
});
contract.on("FundsWithdrawned", (addressOfWithdrawer, amountWithdrawned) => {
    alert("Address " + addressOfWithdrawer + " withdrawn " + parseInt(amountWithdrawned._hex) / 10**18 + " ETH");
});

function ContractButtons() {
    const deposit = async () => {
        const amountToDeposit = document.getElementById("depositAmount").value;
        const deposit_tx = await contract.deposit({value: ethers.utils.parseEther(amountToDeposit)});
    };

    const checkDepositedAmountByGivenAddress = async () => {
        const addressToCheck = document.getElementById("checkDepositedAmount").value;
        const check_tx = await contract.getDepositedAmount(addressToCheck);
        document.getElementById("checkDepositedAmountLabel1").innerHTML = 
            addressToCheck + " has deposited: " + parseInt(check_tx._hex) / 10**18 + " ETH";
    };

    const checkDepositedAmountByCurrentUser = async () => {
        let addressToCheck = "";
        await new ethers.providers.Web3Provider(window.ethereum).listAccounts().then((accounts) => {
            addressToCheck = accounts[0];
        });
        const check_tx = await contract.getDepositedAmount(addressToCheck);
        document.getElementById("checkDepositedAmountByCurrentUserLabel1").innerHTML = 
            addressToCheck + " has deposited: " + parseInt(check_tx._hex) / 10**18 + " ETH";
    };

    const withdraw = async () => {
        const withdraw_tx = await contract.withdrawn();
    };

    return (
        <div className="card">
            <div>
                <h5>Enter ETH amount:</h5>
                <input id="depositAmount" type="value"></input>
                <button onClick={deposit}>Deposit given ETH</button>
            </div>
            <div>
                <h5>Check amount deposited by given address:</h5>
                <input id="checkDepositedAmount" type="value"></input>
                <button onClick={checkDepositedAmountByGivenAddress}>Check deposited ETH</button>
                <label id="checkDepositedAmountLabel1"></label>
            </div>
            <div>
                <h5>Check amount deposited by current user (MetaMask):</h5>
                <button onClick={checkDepositedAmountByCurrentUser}>Check deposited ETH</button>
                <label id="checkDepositedAmountByCurrentUserLabel1"></label>
            </div>
            <div>
                <h5>Withdraw money from contract:</h5>
                <button onClick={withdraw}>Withdraw</button>
                <label id="checkDepositedAmountByCurrentUserLabel1"></label>
            </div>
        </div>
    );

};

export default ContractButtons;