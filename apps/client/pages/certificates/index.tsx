import type { Nft } from '@dinan/types/nft';
import { useEthers } from '@usedapp/core';
import { Button } from 'components/atoms/Button';
import { CertificateTile } from 'components/atoms/CertificateTile';
import { ErrorMessage } from 'components/atoms/ErrorMessage';
import { Loader } from 'components/atoms/Loader';
import { TextInput } from 'components/atoms/TextInput';
import { CertificatesPanelSwitcher } from 'components/molecules/CertificatesPanelSwitcher';
import { Table } from 'components/organisms/Table/Table';
import { TableContent } from 'components/organisms/Table/TableContent';
import { TableHeader } from 'components/organisms/Table/TableHeader';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';

const fetchUserCertificates = async (userAddress: string): Promise<Nft[]> => {
  const response = await fetch(
    `http://localhost:8000/api/v1/users/${userAddress}/certificates`
  );

  const data = await response.json();
  return data.certificates;
};

const Certificates: NextPage = () => {
  const { account } = useEthers();
  const [searchUserCertificates, setSearchUserCertificates] = useState<
    string | undefined
  >(account);
  const [searchCertificate, setSearchCertificate] = useState('');
  const [showMyCertificates, setShowMyCertificates] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setSearchUserCertificates(account);
  }, [account]);

  const {
    data: certificates,
    status,
    refetch,
  } = useQuery<Nft[]>({
    queryKey: ['certificates', searchUserCertificates],
    queryFn: () => fetchUserCertificates(searchUserCertificates as string),
    enabled: !!searchUserCertificates,
  });

  const handleSearchCertificate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCertificate(e.target.value);
  };

  const filterCertificate = (cert: Nft) => {
    const loweredCasedInputValue = searchCertificate.toLowerCase();
    return (
      cert.contract.address.toLowerCase().includes(loweredCasedInputValue) ||
      cert.metadata.name.toLowerCase().includes(loweredCasedInputValue)
    );
  };

  const handleShowMyCertificates = () => {
    if (showMyCertificates) {
      setShowMyCertificates(false);
    } else {
      setShowMyCertificates(true);
      setSearchUserCertificates(account);
    }
  };

  const filteredCertificates = certificates?.filter(filterCertificate);

  const handleSearchUserCertificates = () => {
    if (inputRef.current) {
      setSearchUserCertificates(inputRef.current.value);
    }
    refetch();
  };

  return (
    <>
      <Head>
        <title>Dinan | My Certificates</title>
      </Head>
      <CertificatesPanelSwitcher
        handleShowMyCertificates={handleShowMyCertificates}
        showMyCertificates={showMyCertificates}
      />
      <Table>
        <TableHeader>
          <TextInput
            onChange={handleSearchCertificate}
            disabled={!account}
            placeholder="Type certificate name or it's address"
          />
          {!showMyCertificates && (
            <div className="w-1/2 flex gap-2 justify-end">
              <TextInput
                disabled={!account}
                placeholder="Type user address and press 'Search' button"
                className="w-1/2"
                ref={inputRef}
              />
              <Button
                type="submit"
                onClick={handleSearchUserCertificates}
                className="px-4"
              >
                Search
              </Button>
            </div>
          )}
        </TableHeader>
        <ErrorMessage isError={status === 'error'} />
        <Loader isLoading={status === 'loading'} />
        {status === 'success' && (
          <TableContent>
            {filteredCertificates?.map((cert) => (
              <CertificateTile
                key={`${cert.contract.address}-${searchUserCertificates}`}
                cert={cert}
                ownerAddress={searchUserCertificates}
              />
            ))}
          </TableContent>
        )}
      </Table>
    </>
  );
};

export default Certificates;
