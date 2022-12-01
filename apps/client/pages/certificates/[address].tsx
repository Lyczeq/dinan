import { Nft } from '@dinan/types/Nft';
import { ErrorMessage } from 'components/atoms/ErrorMessage';
import { Loader } from 'components/atoms/Loader';
import { TextWithLabel } from 'components/atoms/TextWithLabel';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useQuery } from 'react-query';

const fetchNFTMetadata = async (
  examAddress: string,
  tokenId: string,
  ownerAddress: string
) => {
  const nft = await fetch(
    `http://localhost:8000/api/v1/users/${ownerAddress}/certificates/${examAddress}?tokenId=${tokenId}`
  );
  return await nft.json();
};

const areQueryParamsValid = (query: ParsedUrlQuery): boolean => {
  return Object.values(query).every(Boolean);
};

type CertificateDetailsProps = {
  nft: Nft | null;
};

const examScore = (base64img: string) => {
  const scoreRegex = new RegExp(/Score (\b([0-9]|[1-9][0-9]|100)\b\%)/);

  const svg = Buffer.from(base64img.substring(26), 'base64').toString();
  const a = svg.match(scoreRegex);
  console.log(svg);
  console.log(a);
  return a ? a[0] : 'There was a problem when reading score attribute';
};

const CertificateDetails = ({ nft }: CertificateDetailsProps) => {
  const router = useRouter();
  const query = router.query as Record<string, string>;

  const { data: userNft, status } = useQuery<Nft | null>({
    queryKey: 'certificate-details',
    queryFn: () =>
      fetchNFTMetadata(query.address, query.tokenId, query.ownerAddress),
    enabled: areQueryParamsValid(query),
    initialData: nft,
  });

  return (
    <>
      <Head>
        <title>Dinan | Certificate Details</title>
      </Head>
      <Loader isLoading={status === 'loading'} />
      <ErrorMessage isError={status === 'error'} />
      {userNft && (
        <div className="flex justify-evenly">
          <Image
            alt={`User NFT, name ${userNft.metadata.name}`}
            src={userNft.metadata.image}
            width={300}
            height={300}
            className="rounded-md"
          />
          <div>
            <div>
              <TextWithLabel label="Exam" text={userNft.metadata.name} />
              <TextWithLabel label="Address" text={userNft.contract.address} />
              <TextWithLabel
                label="Description"
                text={userNft.metadata.description}
              />
              <TextWithLabel
                label="Symbol"
                text={userNft.contractMetadata.symbol}
              />
              <TextWithLabel label="Token ID" text={userNft.id.tokenId} />
            </div>
            <TextWithLabel label="Owner" text={query.ownerAddress} />
            <TextWithLabel
              label="Score"
              text={examScore(userNft.metadata.image)}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default CertificateDetails;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (areQueryParamsValid(context.query))
    return {
      props: {
        nft: null,
      },
    };
  const { address, tokenId, ownerAddress } = context.query;

  const nft = await fetchNFTMetadata(
    address as string,
    tokenId as string,
    ownerAddress as string
  );
  return {
    props: {
      nft,
    },
  };
};
