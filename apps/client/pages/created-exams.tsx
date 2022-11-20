import Head from 'next/head';
import { useQuery } from 'react-query';
import type { NextPage } from 'next';
import { useEthers } from '@usedapp/core';
import { ExamsView } from 'components/templates/ExamsView';
import { ErrorMessage } from 'components/atoms/ErrorMessage';
import type { Exam } from '@dinan/types/Exam';

const fetchExamsCreatedBySpecificUser = async (
  userAddress: string
): Promise<Exam[]> => {
  const response = await fetch(
    `http://localhost:8000/api/v1/users/${userAddress}/exams`
  );
  const data = await response.json();
  return data.exams;
};

const CreatedExams: NextPage = () => {
  const { account } = useEthers();
  const { data: createdExams, status } = useQuery<Exam[]>('created-exams', {
    queryFn: () => fetchExamsCreatedBySpecificUser(account as string),
    enabled: !!account,
  });

  console.log(account);

  return (
    <>
      <Head>
        <title>Dinan | Created Exams</title>
      </Head>

      {!!account ? (
        <ExamsView exams={createdExams} status={status} />
      ) : (
        <ErrorMessage
          isError={!account}
          message="Connect your wallet to see created exams"
        />
      )}
    </>
  );
};

export default CreatedExams;
