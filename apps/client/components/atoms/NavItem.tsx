import Link from 'next/link';
import React from 'react';

type NavItemProps = {
  text: string;
};

export default function NavItem({ text }: NavItemProps) {
  return (
    <li className="">
      <Link href="/exams">
        <a className="inline-block border py-2 px-4 border-white  transition-all duration-200 hover:border-b-orange-400">
          {text}
        </a>
      </Link>
    </li>
  );
}
