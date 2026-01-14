type OptionListProps = {
  option: string;
  setOptions: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
};

const OptionList = ({ option, setOptions, options }: OptionListProps) => {
  return (
    <div>
      <div className="hidden sm:flex sm:flex-row sm:gap-2">
        {options.map((o, index) => (
          <button
            className={`rounded-lg border p-2 text-blue-400 hover:cursor-pointer hover:border-blue-400 ${option === o ? "border-blue-400 text-blue-400" : "border-neutral-500 text-neutral-50"}`}
            key={index}
            onClick={() => setOptions(o)}
          >
            {o}
          </button>
        ))}
      </div>
      <div>
        <select
          className="w-full sm:hidden"
          value={option}
          onChange={(e) => setOptions(e.target.value)}
        >
          {options.map((o, index) => (
            <option key={index} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default OptionList;
