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
  const tokenUriBase64Encoded = await examContract.tokenURI(1);

  // 29 = length of "data:application/json;base64,"
  const tokenUriInJson = Buffer.from(
    tokenUriBase64Encoded.substring(29),
    'base64'
  ).toString();

  const tokenUriData = JSON.parse(tokenUriInJson);

  // 26 = length of "data:image/svg+xml;base64,"
  const svg = Buffer.from(
    tokenUriData.image.substring(26),
    'base64'
  ).toString();

  console.log(svg);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
