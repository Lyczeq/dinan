import { NavbarItem } from '../atoms/NavbarItem';

export const Navbar = () => {
  return (
    <nav>
      <ul className="flex items-center gap-6">
        <NavbarItem href="/exams">Exams</NavbarItem>
        <NavbarItem href="/created-exams">Created Exams</NavbarItem>
        <NavbarItem href="/my-certificates">My Certificates</NavbarItem>
      </ul>
    </nav>
  );
};
