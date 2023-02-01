import { FormEvent, useState } from "react";
import { LoadingIcon } from "../icons/index";

interface DefaultFormProps {
  input1Data: { label: string; placeholder: string };
  input2Data: { label: string; placeholder: string };
  textAreaData: { label: string; placeholder: string };
  onSubmit: (event: FormEvent, data: any) => Promise<void>;
  children?: React.ReactNode;
}

function DefaultForm({
  input1Data,
  input2Data,
  textAreaData,
  onSubmit,
  children,
}: DefaultFormProps) {
  const [input1Value, setInput1Value] = useState<string>("");
  const [input2Value, setInput2Value] = useState<string>("");
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const [isSendingData, setIsSendingData] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSendingData(true);
    await onSubmit(event, { input1Value, input2Value, textAreaValue });
    setInput1Value("");
    setInput2Value("");
    setTextAreaValue("");
    setIsSendingData(false);
  };

  return (
    <form
      className="relative w-full p-4 flex items-center justify-center"
      onSubmit={handleSubmit}
    >
      <div className="sm:w-[60vw] w-[80vw] h-[calc(70vh-1rem)] bg-cerGreen flex flex-col items-center justify-start gap-4 rounded-[20px] shadow-cerShadow px-2">
        <div className="absolute justify-self-start self-start p-3">
          {children}
        </div>
        <span className="text-[20px] mt-2">{input1Data.label}:</span>
        <input
          type="text"
          name="name"
          className="w-[85%] h-[15vh] bg-white rounded-[20px] pl-2"
          placeholder={input1Data.placeholder}
          onChange={(event) => {
            setInput1Value(event.target.value);
          }}
          value={input1Value}
        />
        <span className="text-[20px]">{input2Data.label}:</span>
        <input
          type="text"
          name="email"
          className="w-[85%] h-[15vh] bg-white rounded-[20px] pl-2"
          placeholder={input2Data.placeholder}
          onChange={(event) => setInput2Value(event.target.value)}
          value={input2Value}
        />
        <span className="text-[20px]">{textAreaData.label}:</span>
        <textarea
          name="comment"
          placeholder={textAreaData.placeholder}
          className="w-[calc(85%-1rem)] h-[calc(50vh-1rem)] bg-white resize-none rounded-[20px] px-2 py-2"
          onChange={(event) => setTextAreaValue(event.target.value)}
          value={textAreaValue}
        ></textarea>
        <button
          type="submit"
          disabled={textAreaValue.length === 0 || input2Value.length === 0}
          className="self-end rounded-[20px] bg-cerBlue w-[25%] h-[10%]  mr-10 mb-2 p-2 hover:bg-cerPurple hovert:text-white focus:border-2 focus:border-cerPurple focus:text-white focus:outline-none disabled:opacity-50 disabled:hover:opacity-70 transition-all ease-in-out flex items-center justify-center"
        >
          {(isSendingData && <LoadingIcon />) || `ENVIAR`}
        </button>
      </div>
    </form>
  );
}

export default DefaultForm;
