import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import NavItem from '../components/atoms/NavItem';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Dinan</title>
      </Head>
      <div className="bg-white px-16">
        <div className="min-h-screen">
          <header className="py-10 flex justify-between items-center">
            <Link href="/">
              <a className="text-4xl  text-orange-400 font-lobster">
                <h1>dinan</h1>
              </a>
            </Link>
            <div className="flex items-center justify-around">
              <nav>
                <ul className="flex items-center gap-6">
                  <NavItem href="/exams" text="Exams" />
                  <NavItem href="created-exams" text="Created Exams" />
                  <NavItem href="certificates" text="Certificates" />
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
        </div>
      </div>
    </div>
  );
};

export default Home;
