import { getNewExamContract } from '@dinan/contracts/exam';
import { ethers } from 'hardhat';

const examAddress = '0xff4728c7259c0255b4e1f4c22d057a64da09f34b';

async function main() {
  const provider = new ethers.providers.AlchemyProvider(
    'maticmum',
    process.env.ALCHEMY_API_KEY
  );

  const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);

  const examContract = getNewExamContract(examAddress, signer);
  const tx = await examContract.getParticipantResult(
    '0xd76CC6292b73722dE299cD82318e35aF3390Fa14'
  );

  console.log(tx);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
