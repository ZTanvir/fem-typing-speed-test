import { useEffect, useRef, useState } from "react";
import dropDownIcon from "../assets/images/icon-down-arrow.svg";
import type { Option } from "../types/typingTypes";

type DropDownProps = {
  option: string;
  setOptions: React.Dispatch<React.SetStateAction<string>>;
  options: Option[];
};

const DropDown = ({ option, setOptions, options }: DropDownProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const formEl = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function hideDropdownOnOutsideClick(e: MouseEvent) {
      if (formEl.current && !formEl.current.contains(e.target as Node)) {
        setIsDropdownVisible((prev) => !prev);
      }
    }
    document.addEventListener("mousedown", hideDropdownOnOutsideClick);
    return () => {
      document.removeEventListener("mousedown", hideDropdownOnOutsideClick);
    };
  }, []);

  return (
    <div className="relative">
      <div
        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        className="mb-2 flex cursor-pointer justify-center gap-2 rounded border border-neutral-100 p-0.5 text-neutral-200 capitalize"
      >
        {option} <img src={dropDownIcon} alt="arrow down" />
      </div>
      {isDropdownVisible && (
        <form className="absolute z-2 w-full" ref={formEl}>
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
                    setIsDropdownVisible(!isDropdownVisible);
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
