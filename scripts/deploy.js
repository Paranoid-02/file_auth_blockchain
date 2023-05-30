const hre = require("hardhat");

async function main() {
  const Certificate = await hre.ethers.getContractFactory("Certificate");
  const certificate = await Certificate.deploy();

  await certificate.deployed();

  console.log("Library deployed to:", certificate.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});