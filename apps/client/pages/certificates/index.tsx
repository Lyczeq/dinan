import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEthers } from '@usedapp/core';
import { useQuery } from 'react-query';
import { CertificateTile } from 'components/atoms/CertificateTile';
import { Input } from 'components/atoms/Input';
import { Table } from 'components/organisms/Table/Table';
import { TableContent } from 'components/organisms/Table/TableContent';
import { TableHeader } from 'components/organisms/Table/TableHeader';
import type { Nft } from '@dinan/types/nft';

const fetchUserCertificates = async (userAddress: string) => {
  const response = await fetch(
    `http://localhost:8000/api/v1/users/${userAddress}/certificates`
  );

  const data = await response.json();
  return data.certificates;
};

const Certificates: NextPage = () => {
  const { account } = useEthers();
  const [searchInput, setSearchInput] = useState('');

  const { data: certificates, status } = useQuery<Nft[]>('certificates', {
    queryFn: () => fetchUserCertificates(account as string),
    enabled: !!account,
  });

  const handleSearchCertificate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const filterCertificate = (cert: Nft) => {
    const loweredCasedInputValue = searchInput.toLowerCase();
    return (
      cert.contract.address.toLowerCase().includes(loweredCasedInputValue) ||
      cert.metadata.name.toLowerCase().includes(loweredCasedInputValue)
    );
  };

  const filteredCertificates = certificates?.filter(filterCertificate);

  return (
    <>
      <Head>
        <title>Dinan | Certificates</title>
      </Head>
      <Table>
        <TableHeader>
          <Input
            onChange={handleSearchCertificate}
            disabled={!account}
            placeholder="Type certificate name or it's address"
          />
        </TableHeader>
        <TableContent>
          {filteredCertificates?.map((cert) => (
            <CertificateTile key={cert.contract.address} cert={cert} />
          ))}
        </TableContent>
      </Table>
    </>
  );
};

export default Certificates;
