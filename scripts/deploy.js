const hre = require("hardhat");

async function main() {

  // 📌 Get network info
  const network = hre.network.name;
  console.log("🌍 Network:", network);

  // 📌 Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("🚀 Deploying contract with account:", deployer.address);

  // 📌 Check deployer balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Deployer balance:", hre.ethers.formatEther(balance), "ETH");

  // 📌 Get contract factory
  const CrowdFund = await hre.ethers.getContractFactory("CrowdFund");

  // 👉 If your contract has constructor arguments, pass them here
  // Example:
  // const goalAmount = hre.ethers.parseEther("1"); 
  // const durationInSeconds = 60 * 60 * 24 * 30; // 30 days

  const contract = await CrowdFund.deploy(
    // goalAmount,
    // durationInSeconds
  );

  console.log("⏳ Waiting for deployment...");
  await contract.waitForDeployment();

  // 📌 Get deployed address
  const contractAddress = await contract.getAddress();
  console.log("✅ CrowdFund deployed at:", contractAddress);

  // 📌 Get deployment transaction details
  const deployTx = contract.deploymentTransaction();
  const receipt = await deployTx.wait();

  console.log("⛽ Gas Used:", receipt.gasUsed.toString());
  console.log("🧾 Transaction Hash:", receipt.hash);

  // 📌 OPTIONAL: Call a contract function after deployment
  // Example:
  // const goal = await contract.goal();
  // console.log("🎯 Campaign Goal:", hre.ethers.formatEther(goal), "ETH");

  console.log("🎉 Deployment successful!");
}

// Proper error handling
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
