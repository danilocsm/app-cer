import { RadioGroup } from "@headlessui/react";
import { useEffect, useState } from "react";
import { CheckIcon } from "../icons/index";

interface ActivityFormDifficultyProps {
  onSelected: (selected: string) => void;
}

const options = ["FÁCIL", "MÉDIO", "DIFÍCIL", "MUITO DIFÍCIL"];

function ActivityFormDifficulty({ onSelected }: ActivityFormDifficultyProps) {
  const [selected, setSelected] = useState<string>("FÁCIL");

  useEffect(() => {
    switch (selected) {
      case "FÁCIL":
        onSelected("EASY");
        break;
      case "MÉDIO":
        onSelected("MEDIUM");
        break;
      case "DIFÍCIL":
        onSelected("HARD");
        break;
      case "MUITO DIFÍCIL":
        onSelected("VERY_HARD");
        break;
      default:
        onSelected("");
    }
  }, [selected]);
  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => {
          return (
            <RadioGroup.Option
              key={option}
              value={option}
              className={({ active, checked }) =>
                `${
                  active
                    ? "ring-2 ring-white ring-opacity-60 ring-offset-2"
                    : ""
                }
          ${checked ? "bg-cerPurple" : "bg-cerBlue"}
            relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
              }
            >
              {({ active, checked }) => (
                <div className="flex w-full items-center justify-between">
                  <div className="text-[20px]">{option}</div>
                  {checked && (
                    <div className="shrink-0 text-black">
                      <CheckIcon className="h-6 w-6" />
                    </div>
                  )}
                </div>
              )}
            </RadioGroup.Option>
          );
        })}
      </div>
    </RadioGroup>
  );
}

export default ActivityFormDifficulty;
