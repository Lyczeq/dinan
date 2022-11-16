import { getNewExamContract } from '@dinan/contracts/exam';
import { ethers } from 'hardhat';

const examAddress = '0xED165f51F1e94A59AA82E50532e587bFC3A8B379';

async function main() {
  const provider = new ethers.providers.AlchemyProvider(
    'maticmum',
    process.env.ALCHEMY_API_KEY
  );

  const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);

  const examContract = getNewExamContract(examAddress, signer);
  const tx = await examContract.balanceOf(
    '0xd76CC6292b73722dE299cD82318e35aF3390Fa14'
  );
  console.log(tx);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
