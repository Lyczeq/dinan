import { NavbarItem } from '../atoms/NavbarItem';

export const Navbar = () => (
  <nav>
    <ul className="flex items-center gap-6">
      <NavbarItem href="/exams">Exams</NavbarItem>
      <NavbarItem href="created-exams">Created Exams</NavbarItem>
      <NavbarItem href="certificates">Certificates</NavbarItem>
    </ul>
  </nav>
);
