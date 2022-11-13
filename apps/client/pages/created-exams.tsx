import type { NextPage } from 'next';
import Head from 'next/head';
import { ExamTile } from 'components/atoms/ExamTile';
import { SearchInput } from 'components/atoms/SearchInput';
import { Table } from 'components/organisms/Table/Table';
import Link from 'next/link';

const CreatedExams: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dinan | Created Exams</title>
      </Head>
      <Table>
        <Table.Header>
          <SearchInput />
          <Link
            href="add-exam"
            className="text-yellow-400 hover:text-orange-400 bold font-bold border-b-2 border-yellow-400 hover:border-orange-400"
          >
            Add new Exam
          </Link>
        </Table.Header>
        <Table.Content>
          <ExamTile />
          <ExamTile />
          <ExamTile />
        </Table.Content>
      </Table>
    </>
  );
};

export default CreatedExams;
