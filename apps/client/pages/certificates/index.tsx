import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEthers } from '@usedapp/core';
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
const certificates: Nft[] = [
  {
    contract: {
      address: '0xe5633c82e54a50360b3b7fa2fea93c887b4507ea',
    },
    metadata: {
      name: 'TEST',
      description: 'DESCRIPTION_PLACEHOLDER',
      image:
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHByZXNlcnZlQXNwZWN0UmF0aW89J3hNaW5ZTWluIG1lZXQnIHZpZXdCb3g9JzAgMCAzNTAgMzUwJz48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDI0cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9J2dyZWVuJyAvPjx0ZXh0IHg9JzUwJScgeT0nNTAlJyBjbGFzcz0nYmFzZScgZG9taW5hbnQtYmFzZWxpbmU9J21pZGRsZScgdGV4dC1hbmNob3I9J21pZGRsZSc+PHRzcGFuIHg9JzUwJScgeT0nMjUlJyBmb250LXNpemU9JzIwcHgnPlRFU1Q8L3RzcGFuPjx0c3BhbiB4PSc1MCUnIHk9JzUwJScgZm9udC1zaXplPScxNHB4Jz4weGQ3NmNjNjI5MmI3MzcyMmRlMjk5Y2Q4MjMxOGUzNWFmMzM5MGZhMTQ8L3RzcGFuPjx0c3BhbiB4PSc1MCUnIHk9Jzc1JScgZm9udC1zaXplPSc0MHB4Jz4xMDAlPC90c3Bhbj48L3RleHQ+PC9zdmc+',
    },
    id: {
      tokenId: '0',
    },
    contractMetadata: {
      symbol: 'TT',
    },
  },
  {
    contract: {
      address: '0xed165f51f1e94a59aa82e50532e587bfc3a8b379',
    },
    metadata: {
      name: 'new',
      description: 'DESCRIPTION_PLACEHOLDER',
      image:
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHByZXNlcnZlQXNwZWN0UmF0aW89J3hNaW5ZTWluIG1lZXQnIHZpZXdCb3g9JzAgMCAzNTAgMzUwJz48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDI0cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9J2dyZWVuJyAvPjx0ZXh0IHg9JzUwJScgeT0nNTAlJyBjbGFzcz0nYmFzZScgZG9taW5hbnQtYmFzZWxpbmU9J21pZGRsZScgdGV4dC1hbmNob3I9J21pZGRsZSc+PHRzcGFuIHg9JzUwJScgeT0nMjUlJyBmb250LXNpemU9JzIwcHgnPm5ldzwvdHNwYW4+PHRzcGFuIHg9JzUwJScgeT0nNTAlJyBmb250LXNpemU9JzE0cHgnPjB4ZDc2Y2M2MjkyYjczNzIyZGUyOTljZDgyMzE4ZTM1YWYzMzkwZmExNDwvdHNwYW4+PHRzcGFuIHg9JzUwJScgeT0nNzUlJyBmb250LXNpemU9JzQwcHgnPjAlPC90c3Bhbj48L3RleHQ+PC9zdmc+',
    },
    id: {
      tokenId: '1',
    },
    contractMetadata: {
      symbol: 'nw',
    },
  },
  {
    contract: {
      address: '0xf3799ca36343cdbe487716472931e908e958bdcb',
    },
    metadata: {
      name: 'lt111',
      description: 'DESCRIPTION_PLACEHOLDER',
      image:
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHByZXNlcnZlQXNwZWN0UmF0aW89J3hNaW5ZTWluIG1lZXQnIHZpZXdCb3g9JzAgMCAzNTAgMzUwJz48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDI0cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9J2dyZWVuJyAvPjx0ZXh0IHg9JzUwJScgeT0nNTAlJyBjbGFzcz0nYmFzZScgZG9taW5hbnQtYmFzZWxpbmU9J21pZGRsZScgdGV4dC1hbmNob3I9J21pZGRsZSc+PHRzcGFuIHg9JzUwJScgeT0nMjUlJyBmb250LXNpemU9JzIwcHgnPmx0MTExPC90c3Bhbj48dHNwYW4geD0nNTAlJyB5PSc1MCUnIGZvbnQtc2l6ZT0nMTRweCc+MHhkNzZjYzYyOTJiNzM3MjJkZTI5OWNkODIzMThlMzVhZjMzOTBmYTE0PC90c3Bhbj48dHNwYW4geD0nNTAlJyB5PSc3NSUnIGZvbnQtc2l6ZT0nNDBweCc+MTAwJTwvdHNwYW4+PC90ZXh0Pjwvc3ZnPg==',
    },
    id: {
      tokenId: '0',
    },
    contractMetadata: {
      symbol: 'lt1',
    },
  },
  {
    contract: {
      address: '0xf3799ca36343cdbe487716472931e908e958bscb',
    },
    metadata: {
      name: 'lt111',
      description: 'DESCRIPTION_PLACEHOLDER',
      image:
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHByZXNlcnZlQXNwZWN0UmF0aW89J3hNaW5ZTWluIG1lZXQnIHZpZXdCb3g9JzAgMCAzNTAgMzUwJz48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDI0cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9J2dyZWVuJyAvPjx0ZXh0IHg9JzUwJScgeT0nNTAlJyBjbGFzcz0nYmFzZScgZG9taW5hbnQtYmFzZWxpbmU9J21pZGRsZScgdGV4dC1hbmNob3I9J21pZGRsZSc+PHRzcGFuIHg9JzUwJScgeT0nMjUlJyBmb250LXNpemU9JzIwcHgnPmx0MTExPC90c3Bhbj48dHNwYW4geD0nNTAlJyB5PSc1MCUnIGZvbnQtc2l6ZT0nMTRweCc+MHhkNzZjYzYyOTJiNzM3MjJkZTI5OWNkODIzMThlMzVhZjMzOTBmYTE0PC90c3Bhbj48dHNwYW4geD0nNTAlJyB5PSc3NSUnIGZvbnQtc2l6ZT0nNDBweCc+MTAwJTwvdHNwYW4+PC90ZXh0Pjwvc3ZnPg==',
    },
    id: {
      tokenId: '0',
    },
    contractMetadata: {
      symbol: 'lt1',
    },
  },
];

const Certificates: NextPage = () => {
  const { account } = useEthers();
  const [searchInput, setSearchInput] = useState('');

  // const { data: certificates, status } = useQuery<Nft[]>('certificates', {
  //   queryFn: () => fetchUserCertificates(account as string),
  //   enabled: !!account,
  // });

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

  const filteredCertificates = certificates.filter(filterCertificate);

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
