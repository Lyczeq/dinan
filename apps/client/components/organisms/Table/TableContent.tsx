import { TableProps } from './types';

export const TableContent = ({ children }: TableProps) => {
  return (
    <section className="grid-cols-4 grid mx-4 gap-4 auto-rows-min ">
      {children}
    </section>
  );
};
