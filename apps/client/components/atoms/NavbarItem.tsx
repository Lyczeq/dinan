import React, { AnchorHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

type NavItemProps = {
  href: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const NavbarItem = ({ children, href }: NavItemProps) => {
  return (
    <li className="">
      <Link href={href}>
        <a className="inline-block  py-2 px-4 border border-white  transition-all duration-200 hover:border-b-orange-400">
          {children}
        </a>
      </Link>
    </li>
  );
};
