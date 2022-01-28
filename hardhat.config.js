require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = 'XD';
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/BpjQLtQVzuBpZFe3FDIatyyP8uP_0Zli",
      accounts: ["8a6ab51a9894dfc159147986fabd0b07ac1e17f690ef3d5165a986e7af0084fd"]
    }
  }
};
