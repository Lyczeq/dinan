import type { NextPage } from 'next';
import Head from 'next/head';
import Button from 'components/atoms/Button';
import { ExamTile } from 'components/atoms/ExamTile';
import { SearchInput } from 'components/atoms/SearchInput';
import { Table } from 'components/organisms/Table/Table';

const CreatedExams: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dinan | Created Exams</title>
      </Head>
      <Table>
        <Table.Header>
          <SearchInput />
          <Button className="bg-yellow-400 border-2 border-yellow-400">
            Add new Exam
          </Button>
        </Table.Header>
        <Table.Content>
          <ExamTile></ExamTile>
          <ExamTile></ExamTile>
          <ExamTile></ExamTile>
        </Table.Content>
      </Table>
    </>
  );
};

export default CreatedExams;
