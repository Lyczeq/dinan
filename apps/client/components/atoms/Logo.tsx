import Link from 'next/link';
import React from 'react';
import { Lobster } from '@next/font/google';

const lobsterFont = Lobster({
  subsets: ['latin'],
  weight: ['400'],
});

export const Logo = () => (
  <Link
    href="/"
    className={`text-4xl font-bold ${lobsterFont.className} text-primary`}
  >
    dinan
  </Link>
);
