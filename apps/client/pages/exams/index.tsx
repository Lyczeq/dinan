import { ErrorMessage } from 'components/atoms/ErrorMessage';
import { ExamTile } from 'components/atoms/ExamTile';
import { Loader } from 'components/atoms/Loader';
import { SearchInput } from 'components/atoms/SearchInput';
import { Table } from 'components/organisms/Table/Table';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Exam } from '@dinan/types/Exam';

const fetchExams = async () => {
  const res = await fetch('http://localhost:8000/api/v1/exams');
  const data = await res.json();
  return data.exams;
};

const Exams: NextPage = () => {
  const { data, status } = useQuery<Exam[]>('exams', fetchExams);
  const [searchInput, setSearchInput] = useState('');

  const filterExams = (exam: Exam) => {
    return (
      exam.address.toLowerCase().includes(searchInput.toLowerCase()) ||
      exam.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  const handleSearchExam = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const filteredExams = (data ?? []).filter(filterExams);

  return (
    <>
      <Head>
        <title>Dinan | Exams</title>
      </Head>
      <Table>
        <Table.Header>
          <SearchInput onChange={handleSearchExam} />
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

export default Exams;
