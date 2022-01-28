import { useState } from 'react';
import { ethers } from 'ethers';
import FundMe from '../../artifacts/contracts/FundMe.sol/FundMe.json';

const contractAddress = '0xf0D9b2786a02A3661c7aD9a8089c0dB3347c1De3';
const provider = new ethers.providers.Web3Provider(window.ethereum);
// get the end user
const signer = provider.getSigner();
// get the smart contract
const contract = new ethers.Contract(contractAddress, FundMe.abi, signer);

function ContractButtons() {
    const deposit = async () => {
        const deposit_tx = await contract.deposit({value: ethers.utils.parseEther('0.05')});
        console.log(deposit_tx);
    };

    return (
        <div className="card">
            <div>
                <h5>Enter ETH amount:</h5>
                <input type="value"></input>
                <button onClick={deposit}>Deposit given ETH</button>
            </div>
        </div>
    );

};

export default ContractButtons;