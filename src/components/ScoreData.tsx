const ScoreData = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center gap-1 md:flex-row">
      <span className="text-neutral-400">{name}</span>
      {children}
    </div>
  );
};
export default ScoreData;
