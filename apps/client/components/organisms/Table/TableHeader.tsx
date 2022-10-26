import { TableProps } from './types';

export const TableHeader = ({ children }: TableProps) => {
  return (
    <section className="h-14 flex justify-between items-center m-4 ">
      {children}
    </section>
  );
};
