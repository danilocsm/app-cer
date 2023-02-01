import { Check, Plus, X } from "phosphor-react";
import { SyntheticEvent, useContext, useEffect, useState } from "react";

interface AddActivityInputProps {
  dataName: string;
  dataId: string;
  onAdd: (event: any, activityName: string) => void;
  onRemove: (event: any, activityName: string) => void;
  contextType: React.Context<{
    context: string[];
    setContext: (newValue: any) => void;
    isFormSent: boolean;
  }>;
}

function ComboCheckBoxField({
  dataName,
  dataId,
  onAdd,
  onRemove,
  contextType,
}: AddActivityInputProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { isFormSent } = useContext(contextType);

  const onClick = (event: any) => {
    if (isChecked) onRemove(event, dataId);
    else onAdd(event, dataId);
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setIsChecked(false);
  }, [isFormSent]);

  return (
    <div className="relative grid grid-flow-col justify-between w-full h-[40%] px-2 border-b-[1px] border-cerBlue">
      <span
        className={`${
          isChecked ? `text-cerGreen` : ``
        } flex flex-row justify-center items-center gap-x-1`}
      >
        {dataName}
        {isChecked && <Check className="text-cerGreen h-full" />}
      </span>
      {
        <button onClick={onClick}>
          {(isChecked && <X className="text-red-600 h-full" />) || <Plus />}
        </button>
      }
    </div>
  );
}

export default ComboCheckBoxField;
