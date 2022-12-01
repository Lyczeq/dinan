type TextWithLabelProps = {
  label: string;
  text?: string;
};

export const TextWithLabel = ({ label, text }: TextWithLabelProps) => {
  return (
    <p className="flex items-center gap-2">
      <span className="font-bold">{label} </span>
      <span>{text}</span>
    </p>
  );
};
