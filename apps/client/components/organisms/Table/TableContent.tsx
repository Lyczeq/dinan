import { TableProps } from './types';

export const TableContent = ({ children }: TableProps) => {
  return (
    <section className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid mx-4 gap-4 auto-rows-min justify-items-center items-center">
      {children}
    </section>
  );
};
