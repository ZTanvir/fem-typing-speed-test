import DropDown from "./DropDown";

interface option {
  value: string;
  text: string;
}

type OptionListProps = {
  option: string;
  setOptions: React.Dispatch<React.SetStateAction<string>>;
  options: option[];
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
            className={`rounded-lg border p-2 text-blue-400 capitalize hover:cursor-pointer hover:border-blue-400 ${option === o.value ? "border-blue-400 text-blue-400" : "border-neutral-500 text-neutral-50"}`}
            key={index}
            onClick={() => setOptions(o.value)}
          >
            {o.text}
          </button>
        ))}
      </div>
      {/* dropdown mobile */}
      <div className="sm:hidden">
        <DropDown
          option={option}
          setOptions={setOptions}
          options={options}
          isTestRunning={isTestRunning}
        />
      </div>
    </div>
  );
};
export default OptionList;
