import { useEffect, useRef, useState } from "react";
import dropDownIcon from "../assets/images/icon-down-arrow.svg";

interface option {
  value: string;
  text: string;
}

type DropDownProps = {
  option: string;
  setOptions: React.Dispatch<React.SetStateAction<string>>;
  options: option[];
  isTestRunning: boolean;
};

const DropDown = ({
  option,
  setOptions,
  options,
  isTestRunning,
}: DropDownProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropDownEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function hideDropdownOnOutsideClick(e: MouseEvent) {
      if (
        dropDownEl.current &&
        !dropDownEl.current.contains(e.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    }
    document.addEventListener("mousedown", hideDropdownOnOutsideClick);
    return () => {
      document.removeEventListener("mousedown", hideDropdownOnOutsideClick);
    };
  }, []);

  return (
    <div className="relative" ref={dropDownEl}>
      <button
        disabled={isTestRunning}
        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        className="mb-2 flex w-full cursor-pointer justify-center gap-2 rounded border border-neutral-100 p-0.5 text-neutral-200 capitalize"
      >
        {option} <img src={dropDownIcon} alt="arrow down" />
      </button>
      {isDropdownVisible && (
        <form className="absolute z-2 w-full">
          <div className="divide-y divide-neutral-700 rounded bg-neutral-800 py-1">
            {options.map((o) => (
              <label
                key={o.text}
                className="block py-1 text-neutral-100 hover:cursor-pointer"
                htmlFor={o.text}
              >
                <input
                  className="ml-2"
                  type="radio"
                  name="radioGroup"
                  value={o.value}
                  id={o.text}
                  checked={o.value === option}
                  onChange={(e) => {
                    setOptions(e.target.value);
                    setIsDropdownVisible(false);
                  }}
                />
                <span className="pl-2">{o.text}</span>
              </label>
            ))}
          </div>
        </form>
      )}
    </div>
  );
};
export default DropDown;
