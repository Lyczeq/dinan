import { TableContent } from './TableContent';
import { TableHeader } from './TableHeader';
import { TableProps } from './types';

export const Table = ({ children }: TableProps) => {
  return (
    <main className="bg-white border border-orange-400 border-solid h-3/4 w-full">
      {children}
    </main>
  );
};

Table.Header = TableHeader;
Table.Content = TableContent;
