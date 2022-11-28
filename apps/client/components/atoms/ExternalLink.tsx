import { ReactNode } from 'react';

type ExternalLinkProps = {
  url: string;
  icon?: ReactNode;
  children: ReactNode;
};

export const ExternalLink = ({ url, icon, children }: ExternalLinkProps) => {
  return (
    <a
      href={url}
      className="flex flex-col items-center"
      target="_blank"
      rel="noreferrer"
    >
      {icon}
      <span>{children}</span>
    </a>
  );
};
