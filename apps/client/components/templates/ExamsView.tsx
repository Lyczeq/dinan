import type { Exam } from '@dinan/types/Exam';
import { ErrorMessage } from 'components/atoms/ErrorMessage';
import { ExamTile } from 'components/atoms/ExamTile';
import { Loader } from 'components/atoms/Loader';
import { TextInput } from 'components/atoms/TextInput';
import { Table } from 'components/organisms/Table/Table';
import { useState } from 'react';
import { QueryStatus } from 'react-query';

type ExamsViewProps = {
  exams: Exam[] | undefined;
  status: QueryStatus;
  headerActions?: React.ReactNode;
};

export const ExamsView = ({
  exams,
  status,
  headerActions = [],
}: ExamsViewProps) => {
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
        <TextInput
          onChange={handleSearchExam}
          placeholder="Type exam name or it's address"
          disabled={status === 'loading' || status === 'error'}
        />
        <div>{headerActions}</div>
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
