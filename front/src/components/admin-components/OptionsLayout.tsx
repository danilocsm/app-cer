import { RadioGroup } from "@headlessui/react";
import { useEffect, useState } from "react";
import { CheckIcon } from "../icons/index";

interface OptionsLayoutProps {
  onSelected: (selected: number) => void;
}

const options = [
  { name: "DÚVIDAS", value: 0 },
  { name: "NOVA ATIVIDADE", value: 1 },
  { name: "NOVO UTENSÍLIO", value: 2 },
  { name: "LISTA DE ATIVIDADES", value: 3 },
  { name: "LISTA DE UTENSÍLIOS", value: 4 },
  { name: "EDITAR DADOS DO AGENTE", value: 5 },
];

function OptionsLayout({ onSelected }: OptionsLayoutProps) {
  const [selected, setSelected] = useState<{ name: string; value: number }>(
    options[0]
  );

  useEffect(() => {
    onSelected(selected.value);
  }, [selected]);

  return (
    <RadioGroup
      value={selected}
      onChange={setSelected}
      className="w-[75vw] h-[30vh] px-6 mt-6"
    >
      <div className="grid grid-cols-2 gap-2 w-full h-full">
        {options.map((option) => {
          return (
            <RadioGroup.Option
              key={option.value}
              value={option}
              className={({ active, checked }) =>
                `${
                  active
                    ? "ring-2 ring-white ring-opacity-60 ring-offset-2"
                    : ""
                }
          ${checked ? "bg-cerPurple" : "bg-cerBlue"}
            cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none h-[9vh]`
              }
            >
              {({ active, checked }) => (
                <div className="relative flex w-full h-full items-center justify-between">
                  <div className="text-[20px]">{option.name}</div>
                  {checked && (
                    <div className="absolute right-1 text-black">
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

export default OptionsLayout;
