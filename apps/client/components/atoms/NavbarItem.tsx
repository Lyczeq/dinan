import React, { AnchorHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItemProps = {
  href: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const NavbarItem = ({ children, href }: NavItemProps) => {
  const pathname = usePathname();
  const selectedRouteClassName =
    href === pathname ? 'font-bold  text-orange-400' : null;

  return (
    <li className="">
      <Link
        href={href}
        className={`inline-block  font-bold py-2 px-4 border border-white transition-all duration-200 hover:border-b-orange-400 ${selectedRouteClassName}`}
      >
        {children}
      </Link>
    </li>
  );
};
