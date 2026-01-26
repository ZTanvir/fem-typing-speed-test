type OptionListProps = {
  option: string;
  setOptions: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
  isTestRunning: boolean;
};

const OptionList = ({
  option,
  setOptions,
  options,
  isTestRunning,
}: OptionListProps) => {
  return (
    <div className="w-full">
      <div className="hidden sm:flex sm:flex-row sm:gap-2">
        {options.map((o, index) => (
          <button
            disabled={isTestRunning}
            className={`rounded-lg border p-2 text-blue-400 capitalize hover:cursor-pointer hover:border-blue-400 ${option === o ? "border-blue-400 text-blue-400" : "border-neutral-500 text-neutral-50"}`}
            key={index}
            onClick={() => setOptions(o)}
          >
            {o}
          </button>
        ))}
      </div>
      <div>
        <select
          disabled={isTestRunning}
          className="w-full rounded border border-neutral-500 bg-neutral-900 p-0.5 text-neutral-100 capitalize sm:hidden"
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
