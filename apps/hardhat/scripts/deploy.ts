import { ethers } from 'hardhat';

async function main() {
  const ExamController = await ethers.getContractFactory('ExamController');
  const examController = await ExamController.deploy();

  await examController.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
