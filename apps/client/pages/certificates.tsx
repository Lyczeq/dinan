import { useEthers } from '@usedapp/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useQuery } from 'react-query';

const fetchUserCertificates = async (userAddress: string) => {
  const response = await fetch(
    `http://localhost:8000/api/v1/users/${userAddress}/certificates`
  );

  const data = response.json();
  return data;
};

const Certificates: NextPage = () => {
  const { account } = useEthers();
  const { data, status } = useQuery('certificates', {
    queryFn: () => fetchUserCertificates(account as string),
    enabled: !!account,
  });

  

  return (
    <>
      <Head>
        <title>Dinan | Certificates</title>
      </Head>
      <p>{JSON.stringify(data)}</p>
    </>
  );
};

export default Certificates;
