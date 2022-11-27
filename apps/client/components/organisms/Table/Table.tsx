import { TableContent } from './TableContent';
import { TableHeader } from './TableHeader';
import { TableProps } from './types';

export const Table = ({ children }: TableProps) => {
  return <main className=" w-full">{children}</main>;
};

Table.Header = TableHeader;
Table.Content = TableContent;
