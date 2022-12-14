import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dinan</title>
      </Head>
      <section className="h-1/2 flex gap-10 justify-around items-center flex-col mt-10">
        <h2 className="flex flex-col text-6xl p-10 text-transparent bg-clip-text bg-gradient-to-tr from-primary to-secondary  font-extrabold text-center">
          <span>Your decentralized app for creating exams</span>
          <span>and managing certificates!</span>
        </h2>
        <h3 className="text-4xl text-primary font-bold transition-all duration-200 hover:text-secondary">
          <Link href="/add-exam">Create your first exam</Link>
        </h3>
        <p className="text-2xl text-lightGrey">or</p>
        <h3 className="text-4xl text-primary font-bold transition-all duration-200 hover:text-secondary">
          <Link href="/exams">
            take part in the exams created by other users!
          </Link>
        </h3>
      </section>
    </>
  );
};

export default Home;
