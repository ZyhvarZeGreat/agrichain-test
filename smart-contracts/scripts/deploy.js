const hre = require("hardhat");
async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log(deployer)
  console.log(`Deploying from account: ${deployer.address}`);


  const ProductRegistration = await hre.ethers.getContractFactory('ProductRegistration');
  const productRegistration = await ProductRegistration.deploy();
  await productRegistration.waitForDeployment()
  const productRegistrationAddress = await productRegistration.getAddress()
  console.log(` ProductRegistrations deployed to address: ${productRegistrationAddress}`);
  
  const BatchRegistration = await hre.ethers.getContractFactory('BatchRegistration');
  const batchRegistration = await BatchRegistration.deploy();
  await batchRegistration.waitForDeployment()
  const batchRegistrationAddress = await batchRegistration.getAddress()
  console.log(` BatchRegistrations deployed to address: ${batchRegistrationAddress}`);

  const TransactionRegistration = await hre.ethers.getContractFactory('TransactionRegistration');
  const transactionRegistration = await TransactionRegistration.deploy();
  await transactionRegistration.waitForDeployment()
  const transactionRegistrationAddress = await transactionRegistration.getAddress()
  console.log(` TransactionRegistrations deployed to address: ${transactionRegistrationAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });