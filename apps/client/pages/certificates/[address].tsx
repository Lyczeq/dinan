import { Nft } from '@dinan/types/Nft';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
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

const areQueryParamsValid = (query: ParsedUrlQuery): boolean => {
  return Object.values(query).every(Boolean);
};

type CertificateDetailsProps = {
  nft: Nft | null;
};

const CertificateDetails = ({ nft }: CertificateDetailsProps) => {
  const router = useRouter();
  const query = router.query as Record<string, string>;

  const { data } = useQuery<Nft | null>({
    queryKey: 'certificate-details',
    queryFn: () =>
      fetchNFTMetadata(query.address, query.tokenId, query.ownerAddress),
    enabled: areQueryParamsValid(query),
    initialData: nft,
  });
  console.log(data);

  return <p>hi</p>;
};
export default CertificateDetails;
