import type { NextPage } from 'next';
import Head from 'next/head';
import { ExamTile } from 'components/atoms/ExamTile';
import { SearchInput } from 'components/atoms/SearchInput';
import { Table } from 'components/organisms/Table/Table';
import { useQuery } from 'react-query';

const fetchExams = async () => {
  const res = await fetch('http://localhost:8000/api/v1/exams');
  return res.json();
};

const Exams: NextPage = () => {
  const { data, status } = useQuery('exams', fetchExams);
  console.log(data);
  return (
    <>
      <Head>
        <title>Dinan | Exams</title>
      </Head>
      <Table>
        <Table.Header>
          <SearchInput />
        </Table.Header>
        {status === 'error' && <p>Something went wrong</p>}
        {status === 'loading' && <p>Loading...</p>}
        {status === 'success' && (
          <Table.Content>
            {data.exams.map((exam: any) => (
              <ExamTile key={exam.address} exam={exam} />
            ))}
          </Table.Content>
        )}
      </Table>
    </>
  );
};

export default Exams;
