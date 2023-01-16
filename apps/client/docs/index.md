# Components directory

This directory consists of the React components. There is a pattern called Atomic Design that was used.

## Atoms directory

This directory includes simple components that are used to create more complicated ones

- ### Button
  Component that is used to display a button to be clicked.

```ts
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
};
```

```ts
const Button = ({
  className,
  children,
  onClick,
  icon,
  ...props
}: ButtonProps) => {};
```

- ### CertificateTile
  Component used to display an element shown on the certificates list

```ts
type CertificateTileProps = {
  cert: Nft;
  ownerAddress: string | undefined;
};
```

```ts
const CertificateTile = ({ cert, ownerAddress }: CertificateTileProps) => {};
```

- ### Checkbox
  Component used to display a checkbox element

```ts
type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?: string;
};
```

```ts
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', ...props }, ref) => {}
);
```

- ### ErrorMessage
  Component used to display a proper message when there was an error

```ts
type ErrorMessageProps = FetchStatusComponentProps & {
  isError: boolean;
};
```

```ts
const ErrorMessage = ({ isError, message }: ErrorMessageProps) => {};
```

- ### ErrorText
  Component to display a simple text that describes an error. Used in form validation.

```ts
type ErrorTextProps = {
  errorMessage?: string;
};
```

```ts
const ErrorText = ({ errorMessage }: ErrorTextProps) => {
  return errorMessage ? <p className="text-error">{errorMessage}</p> : null;
};
```

- ### ExamTile
  Component used to display an element on the exams list

```ts
type ExamTileProps = {
  exam: Exam;
};
```

```ts
const ExamTile = ({ exam }: ExamTileProps) => {};
```

- ### ExternalLink
  Component used to display a link to an external source

```ts
type ExternalLinkProps = {
  url: string;
  icon?: ReactNode;
  children: ReactNode;
};
```

```ts
const ExternalLink = ({ url, icon, children }: ExternalLinkProps) => {};
```

- ### Footer
  Component used to display a footer on the page with some contact information

```ts
const Footer = () => {};
```

- ### Loader
  Component that is shown during a loading state

```ts
type LoaderProps = FetchStatusComponentProps & {
  isLoading: boolean;
};
```

```ts
const Loader = ({ isLoading, message }: LoaderProps) => {};
```

- ### Logo
  Component that displays a logo of the application.

```ts
const Logo = () => ()
```

- ### NavbarItem
  Component that displays of the navigation items

```ts
type NavItemProps = {
  href: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;
```

```ts
const NavbarItem = ({ children, href }: NavItemProps) => {};
```

- ### TextAreaInput
  Component that is displayed as a form element to write an question or answer value into

```ts
type TextAreaInputProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  errorMessage?: string;
};
```

```ts
const TextAreaInput = React.forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  ({ errorMessage, className, ...props }, ref) => {}
);
```

- ### TextInput

Component that is displayed as a form element to write a name/symbol/description value into

```ts
type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  errorMessage?: string;
};
```

```ts
const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ errorMessage, className, ...props }, ref) => {}
);
```

- ### TextWithLabel

  Component that displays an input with an attached label

```ts
type TextWithLabelProps = {
  label: string;
  text?: string;
};
```

```ts
const TextWithLabel = ({ label, text }: TextWithLabelProps) => {};
```

## Molecules directory

This directory includes more complicated React components. Most of them have their own logic behind.

- ### CertificatesPanelSwitcherProps
  Component to display a switcher on certificates view.

```ts
type CertificatesPanelSwitcherProps = {
  showMyCertificates: boolean;
  handleShowMyCertificates: VoidFunction;
};
```

```ts
const CertificatesPanelSwitcher = ({
  handleShowMyCertificates,
  showMyCertificates,
}: CertificatesPanelSwitcherProps) => {};
```

- ### ConnectWalletButton
  Component that is used to connect a user's wallet to the application

```ts
const ConnectWalletButton = () => {};
```

- ### FormGroup
  Component that is used to display one element of the form when adding a new exam.

```ts
type FormGroupProps = {
  label: string;
  children: React.ReactNode;
};
```

```ts
const FormGroup = ({ label, children }: FormGroupProps) => {};
```

- ### Header
  Component that is used to display header of the web application.

```ts
const Header = () => {};
```

- ### Navbar
  Component that is used to display the navigation of the application.

```ts
export const Navbar = () => {};
```

## Templates directory

This directory includes complex React components that usually are used as a template of the page

- ### ExamsView
  Component that is used to display both exams and created exams views

```ts
type ExamsViewProps = {
  exams: BasicExam[] | undefined;
  status: QueryStatus;
  headerActions?: React.ReactNode;
};
```

```ts
const ExamsView = ({ exams, status, headerActions = [] }: ExamsViewProps) => {};
```

# Hooks directory

This directory includes custom hooks. These are special React functions that manage state

- ### useExamControllerMethod
  This hook allows to call a ExamController method, for example `addExam` or `manageExamParticipation`.

```ts
const useExamControllerMethod = (methodName: string) => {};
```
