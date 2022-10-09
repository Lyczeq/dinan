import { ethers } from 'hardhat';

export async function getTimestampFixture() {
  const blockNumber = await ethers.provider.getBlockNumber();
  const block = await ethers.provider.getBlock(blockNumber);
  return block.timestamp;
}
