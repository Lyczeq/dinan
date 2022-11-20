import { useState } from 'react';
import { QueryStatus } from 'react-query';
import { ErrorMessage } from 'components/atoms/ErrorMessage';
import { ExamTile } from 'components/atoms/ExamTile';
import { Loader } from 'components/atoms/Loader';
import { Input } from 'components/atoms/Input';
import { Table } from 'components/organisms/Table/Table';
import type { Exam } from '@dinan/types/Exam';

type ExamsViewProps = {
  exams: Exam[] | undefined;
  status: QueryStatus;
};

export const ExamsView = ({ exams, status }: ExamsViewProps) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchExam = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const filterExams = (exam: Exam) => {
    return (
      exam.address.toLowerCase().includes(searchInput.toLowerCase()) ||
      exam.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  const filteredExams = (exams ?? []).filter(filterExams);

  return (
    <Table>
      <Table.Header>
        <Input
          onChange={handleSearchExam}
          disabled={status === 'loading' || status === 'error'}
        />
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
  );
};
