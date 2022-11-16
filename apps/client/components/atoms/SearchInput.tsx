type SearchInput = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const SearchInput = ({ onChange }: SearchInput) => {
  return (
    <input
      onChange={onChange}
      type="text"
      placeholder="Type exam name or address"
      className="w-1/3 border-yellow-400 border-2 p-2 rounded-md focus:outline-orange-400 text-gray-600"
    />
  );
};
