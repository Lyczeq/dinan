import type { Nft } from '@dinan/types/Nft';
import fetch from 'cross-fetch';
import type { Request, Response } from 'express';
import z from 'zod';
import { env } from '../config';
import prisma from '../prisma';

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

const hexToDecimal = (hexNumber: string): string =>
  parseInt(hexNumber).toString();
const simplifyNFTData = (nft: Nft): Nft => {
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
      symbol: nft.contractMetadata?.symbol,
    },
  };
};

const fetchUserNfts = async (userAddress: string): Promise<Nft[]> => {
  const url = `${env.ALCHEMY_HTTPS_LINK}/getNFTs/?owner=${userAddress}`;
  const response = await fetch(url);
  if (response.status !== 200) throw new Error();
  const data = await response.json();
  return data.ownedNfts;
};

export const getUserCertificates = async (req: Request, res: Response) => {
  const userAddress = req.params.address;

  if (!userAddress) {
    res.sendStatus(400);
    return;
  }

  try {
    const ownedNfts = await fetchUserNfts(userAddress);

    const examAddresses = (await prisma.exam.findMany()).map(exam =>
      exam.address.toLowerCase()
    );

    const isExamContract = (examAddresses: string[], nft: Nft): boolean => {
      return examAddresses.includes(nft.contract.address.toLowerCase());
    };

    const filteredNfts = ownedNfts.reduce(
      (nftAccumulator: Nft[], currentNft) => {
        if (isExamContract(examAddresses, currentNft)) {
          const newNft = simplifyNFTData(currentNft);
          return [...nftAccumulator, newNft];
        }
        return [...nftAccumulator];
      },
      []
    );

    res.statusCode = 200;
    res.send({ certificates: filteredNfts });
  } catch (error) {
    res.sendStatus(400);
  }
};

const fetchNFTMetadata = async (contractAddress: string, tokenId: string) => {
  const nft = await fetch(
    `${env.ALCHEMY_HTTPS_LINK}/getNFTMetadata?contractAddress=${contractAddress}&tokenId=${tokenId}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return await nft.json();
};

const getNFTMetadataParams = z.object({
  address: z.string().min(1),
  certAddress: z.string().min(1),
});

const getNFTMetadataQuery = z.object({
  tokenId: z.string().min(1),
});

type GetNFTMetadataParams = z.infer<typeof getNFTMetadataParams>;
type GetNFTMetadataQuery = z.infer<typeof getNFTMetadataQuery>;

export const getNFTMetadata = async (req: Request, res: Response) => {
  if (!getNFTMetadataParams.safeParse(req.params).success) {
    res.sendStatus(400);
    return;
  }

  if (!getNFTMetadataQuery.safeParse(req.query).success) {
    res.sendStatus(400);
    return;
  }

  try {
    const params = req.params as GetNFTMetadataParams;
    const query = req.query as GetNFTMetadataQuery;
    const nft = await fetchNFTMetadata(params.certAddress, query.tokenId);
    const nftt = simplifyNFTData(nft);
    res.statusCode = 200;
    res.send(nftt);
  } catch (error) {
    res.sendStatus(500);
  }
};
