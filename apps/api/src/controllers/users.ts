import fetch from 'cross-fetch';
import type { Request, Response } from 'express';
import type { Nft } from '@dinan/types/Nft';
import prisma from '../prisma';
import { env } from '../config';
export const getExamsCreatedBySpecificUser = async (
  req: Request,
  res: Response
) => {
  const userAddress = req.params.address;

  try {
    const exams = await prisma.exam.findMany({
      where: {
        creatorAddress: {
          mode: 'insensitive',
          equals: userAddress,
        },
      },
    });

    res.statusCode = 200;
    res.send({
      exams,
    });
  } catch (e) {}
};

const fetchUserNfts = async (userAddress: string): Promise<Nft[]> => {
  const url = `${env.ALCHEMY_HTTPS_LINK}/getNFTs/?owner=${userAddress}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.ownedNfts;
};

export const getUserCertificates = async (req: Request, res: Response) => {
  const userAddress = req.params.address;

  const ownedNfts = await fetchUserNfts(userAddress);

  const examAddresses = (await prisma.exam.findMany()).map(exam =>
    exam.address.toLowerCase()
  );

  const isExamContract = (examAddresses: string[], nft: Nft): boolean => {
    return examAddresses.includes(nft.contract.address.toLowerCase());
  };

  const hexToDecimal = (hexNumber: string): string =>
    parseInt(hexNumber).toString();

  const getNewNft = (nft: Nft): Nft => {
    return {
      contract: {
        ...nft.contract,
      },
      metadata: {
        ...nft.metadata,
      },
      id: {
        tokenId: hexToDecimal(nft.id.tokenId),
      },
      contractMetadata: {
        symbol: nft.contractMetadata.symbol,
      },
    };
  };

  const filteredNfts = ownedNfts.reduce((nftAccumulator: Nft[], currentNft) => {
    if (isExamContract(examAddresses, currentNft)) {
      const newNft = getNewNft(currentNft);
      return [...nftAccumulator, newNft];
    }
    return [...nftAccumulator];
  }, []);

  res.statusCode = 200;
  res.send({ certificates: filteredNfts });
};
