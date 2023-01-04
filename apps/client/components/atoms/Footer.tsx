import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { ExternalLink } from './ExternalLink';

export const Footer = () => {
  return (
    <footer className="w-screen 2xl:w-[calc(99vw)] bg-gradient-to-tr from-primary to-secondary h-[calc(9.9rem)] flex justify-center items-center gap-6 text-white ">
      <ExternalLink
        url="https://www.linkedin.com/in/jakublyczko/"
        icon={<LinkedInLogoIcon className="w-6 h-6" />}
      >
        Linkedin
      </ExternalLink>
      <ExternalLink
        url="https://github.com/Lyczeq/dinan"
        icon={<GitHubLogoIcon className=" w-6 h-6" />}
      >
        Github
      </ExternalLink>
    </footer>
  );
};
