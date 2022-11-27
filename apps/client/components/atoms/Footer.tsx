import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';

export const Footer = () => {
  return (
    <footer className="w-[calc(100vw-1rem)] overflow-x-hidden bg-gradient-to-tr from-orange-400 to-yellow-400 h-36 flex justify-center items-center gap-6 text-white">
      <a
        href="https://www.linkedin.com/in/jakublyczko/"
        className="flex flex-col items-center"
        target="_blank"
        rel="noreferrer"
      >
        <LinkedInLogoIcon className=" w-6 h-6" />
        <span>Linkedin</span>
      </a>
      <a
        href="https://github.com/Lyczeq/dinan"
        className="flex flex-col items-center"
        target="_blank"
        rel="noreferrer"
      >
        <GitHubLogoIcon className=" w-6 h-6" />
        <span>Github</span>
      </a>
    </footer>
  );
};
