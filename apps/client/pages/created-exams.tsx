import { useEthers } from '@usedapp/core';
import { ErrorMessage } from 'components/atoms/ErrorMessage';
import { ExamTile } from 'components/atoms/ExamTile';
import { Loader } from 'components/atoms/Loader';
import { SearchInput } from 'components/atoms/SearchInput';
import { Table } from 'components/organisms/Table/Table';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useQuery } from 'react-query';

const fetchExamsCreatedBySpecificUser = async (userAddress: string) => {
  const response = await fetch(
    `http://localhost:8000/api/v1/users/${userAddress}/exams`
  );
  return await response.json();
};

const CreatedExams: NextPage = () => {
  const { account } = useEthers();
  const { data, status } = useQuery('created-exams', {
    queryFn: () => fetchExamsCreatedBySpecificUser(account as string),
    enabled: !!account,
  });
  const [searchInput, setSearchInput] = useState('');

  const filterExams = (exam: any) => {
    return (
      exam.address.toLowerCase().includes(searchInput.toLowerCase()) ||
      exam.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  const handleSearchExam = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const filteredExams = (data?.exams ?? []).filter(filterExams);

  console.log(status);
  return (
    <>
      <Head>
        <title>Dinan | Created Exams</title>
      </Head>
      <Table>
        <Table.Header>
          <SearchInput onChange={handleSearchExam} />
          <Link
            href="add-exam"
            className="text-yellow-400 hover:text-orange-400 bold font-bold border-b-2 border-yellow-400 hover:border-orange-400"
          >
            Add new Exam
          </Link>
        </Table.Header>
        <ErrorMessage isError={status === 'error'} />
        <Loader isLoading={status === 'loading'} />
        {status === 'success' && (
          <Table.Content>
            {filteredExams.map((exam: any) => (
              <ExamTile key={exam.address} exam={exam} />
            ))}
          </Table.Content>
        )}
      </Table>
    </>
  );
};

export default CreatedExams;
