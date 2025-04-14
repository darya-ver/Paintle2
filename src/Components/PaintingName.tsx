type Option = {
  name: string;
  artist: string;
  date: string;
};

export const PaintingName = ({ option }: { option: Option }) => {
  return (
    <>
      <b>{option.name}</b> — {option.artist} ({option.date})
    </>
  );
};
