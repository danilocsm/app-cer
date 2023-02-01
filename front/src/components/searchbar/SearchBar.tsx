import { Fragment, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PublicApi } from "../../lib/api";
import SearchButton from "./SearchButton";
import { SearchIcon } from "../icons/index";
import { Combobox, Transition } from "@headlessui/react";
import { ActivityObjectProps } from "../../lib/utils";

interface SearchBarProps {
  activities: ActivityObjectProps[];
}

function SearchBar({ activities }: SearchBarProps) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  const onSearchClick = () => {
    if (!selected) return;
    navigate("/activities/detail/" + selected, {
      replace: true,
      state: { ...activities.find((element) => element.name === selected) },
    });
  };

  const filteredActivities =
    query === ""
      ? activities
      : activities.filter((activity) =>
          activity.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="flex flew-row w-screen items-center justify-center gap-x-4">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-[60vw] h-[8vh] cursor-default overflow-hidden rounded-[20px] bg-white text-left shadow-cerShadow">
            <Combobox.Input
              className="sm:text-[20px] text-[16px] p-4 w-full h-full rounded-[20px] focus:outline-none focus:underline focus:decoration-cerBlue focus:underline-offset-2"
              displayValue={(activityName: string) => activityName}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Digite sua busca..."
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SearchIcon />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-[60vw] overflow-auto rounded-[20px] bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredActivities.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredActivities.map((activity) => (
                  <Combobox.Option
                    key={activity.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-cerGreen text-white" : "text-gray-900"
                      }`
                    }
                    value={activity.name}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {activity.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-cerGreen"
                            }`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      <SearchButton onClick={onSearchClick} />
      <Toaster position="top-right" />
    </div>
  );
}

export default SearchBar;
