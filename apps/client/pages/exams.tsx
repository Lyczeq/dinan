import type { NextPage } from 'next';
import Head from 'next/head';
import { ExamTile } from 'components/atoms/ExamTile';
import { SearchInput } from 'components/atoms/SearchInput';
import { Table } from 'components/organisms/Table/Table';

const Exams: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dinan | Exams</title>
      </Head>
      <Table>
        <Table.Header>
          <SearchInput />
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

export default Exams;
