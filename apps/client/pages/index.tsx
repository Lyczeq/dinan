import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { NavbarItem } from '../components/atoms/NavbarItem';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dinan</title>
      </Head>
      <header className="py-8 flex justify-between items-center">
        <Link href="/">
          <a className="text-4xl text-orange-400 font-lobster">
            <h1>dinan</h1>
          </a>
        </Link>
        <div className="flex items-center justify-around">
          <nav>
            <ul className="flex items-center gap-6">
              <NavbarItem href="/exams">Exams</NavbarItem>
              <NavbarItem href="created-exams">Created Exams</NavbarItem>
              <NavbarItem href="certificates">Certificates</NavbarItem>
            </ul>
          </nav>
          <button
            className="ml-6 bg-gradient-to-tr from-orange-400 to-yellow-400 px-4 py-2 text-white rounded-md font-bold
              "
          >
            Connect Wallet
          </button>
        </div>
      </header>
    </>
  );
};

export default Home;
