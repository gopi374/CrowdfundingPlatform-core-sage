const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("🚀 Deploying CrowdFund contract with:", deployer.address);

  const CrowdFund = await hre.ethers.getContractFactory("CrowdFund");
  const contract = await CrowdFund.deploy();
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log("✅ CrowdFund deployed at:", contractAddress);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
