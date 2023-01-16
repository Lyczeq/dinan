# Components

## Atoms

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
export const Button = ({
  className,
  children,
  onClick,
  icon,
  ...props
}: ButtonProps){}
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
export const CertificateTile = ({
  cert,
  ownerAddress,
}: CertificateTileProps) => {};
```
