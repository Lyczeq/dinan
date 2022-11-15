import { ethers } from 'hardhat';

const examAddress = '0xe5633C82E54a50360b3B7Fa2fea93C887B4507Ea';
import EXAM from '../artifacts/contracts/Exam.sol/Exam.json';

async function main() {
  const provider = new ethers.providers.AlchemyProvider(
    'maticmum',
    process.env.ALCHEMY_API_KEY
  );

  const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);

  const examContract = new ethers.Contract(examAddress, EXAM.abi, signer);
  const tx = await examContract.balanceOf(
    '0xd76CC6292b73722dE299cD82318e35aF3390Fa14'
  );
  console.log(tx);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
