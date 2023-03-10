import { createContext, FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { PrivateApi } from "../../lib/api";
import ActivityImageInput from "./ActivityImageInput";
import ActivityFormDifficulty from "./ActivityFormDifficulty";
import { LoadingIcon } from "../icons/index";
import { ComboCheckBox } from "./index";

type FormStringInputs = {
  name: string;
  illnesses: string;
  description: string;
  observations: string;
};

const ActivityFormContext = createContext<{
  context: string[];
  setContext: (newValue: any) => void;
  isFormSent: boolean;
}>({ context: [], setContext: () => undefined, isFormSent: false });

function ActivityForm() {
  const [inputs, setInputs] = useState<FormStringInputs>({
    name: "",
    illnesses: "",
    description: "",
    observations: "",
  });
  const [difficulty, setDifficulty] = useState("");
  const [activityItems, setActivityItems] = useState<string[]>([]);
  const [base64, setBase64] = useState<string>();
  const [isSendingData, setIsSendingData] = useState<boolean>(false);

  const handleTextInputChange = (event: any) => {
    event.stopPropagation();
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSendingData(true);
    try {
      await PrivateApi.post("/activities", {
        ...inputs,
        difficulty: difficulty,
        image: base64,
        itemsId: activityItems,
      });
      toast.success("Atividade cadastrada com sucesso!");
    } catch (error: any) {
      if (error.response.data.status === 403)
        toast.error("Usuário não autenticado");
      else if (error.response.data.status === 400)
        toast.error("Campos inválidos");
      else toast.error("Erro inesperado.");
    } finally {
      setIsSendingData(false);
    }
    setInputs({ name: "", illnesses: "", description: "", observations: "" });
  };

  const _handleReaderLoaded = (readerEvt: any) => {
    let binaryString = readerEvt.target.result;
    setBase64(btoa(binaryString));
  };

  const onChange = (event: any) => {
    if (event.target.files === undefined || event.target.files === null) return;
    let file = event?.target?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded;
      reader.readAsBinaryString(file);
    }
  };

  return (
    <ActivityFormContext.Provider
      value={{
        context: activityItems,
        setContext: setActivityItems,
        isFormSent: isSendingData,
      }}
    >
      <div className="flex flex-col items-center justifty-center w-[calc(50vw-1rem)] h-fit px-4 overflow-hidden gap-y-4">
        <h1 className="text-[36px] my-2">CADASTRO DE UMA ATIVIDADE</h1>
        <form
          id="activityForm"
          className="w-[calc(50vw-1rem)] flex flex-col items-center justify-center gap-y-4"
          onSubmit={handleSubmit}
          onChange={(event) => onChange(event)}
        >
          <span className="text-[20px] self-start">NOME DA ATIVIDADE:</span>
          <input
            autoFocus={true}
            type="text"
            name="name"
            onChange={handleTextInputChange}
            value={inputs.name || ""}
            className="w-[calc(50vw-1rem)] h-[calc(10vh-1rem)] bg-white rounded-[20px] border-[1px] border-solid border-cerBlue p-2"
          />
          <span className="text-[20px] self-start">
            SÍNDROMES E DOENÇAS EM FOCO:
          </span>
          <textarea
            className="bg-white rounded-[20px] resize-none p-2 w-[calc(50vw-1rem)] h-[calc(10vh-1rem)] border-[1px] border-solid border-cerBlue"
            name="illnesses"
            value={inputs.illnesses || ""}
            onChange={handleTextInputChange}
            onSubmit={handleSubmit}
          />
          <span className="text-[20px] self-start">DESCRIÇÃO:</span>
          <textarea
            className="bg-white rounded-[20px] resize-none p-2 w-[calc(50vw-1rem)] h-[calc(15vh-1rem)] border-[1px] border-solid border-cerBlue"
            name="description"
            value={inputs.description || ""}
            onChange={handleTextInputChange}
          />
          <span className="text-[20px] self-start">
            SELECIONE A DIFICULDADE:
          </span>
          <div className="w-full">
            <ActivityFormDifficulty
              onSelected={(selected: string) => {
                setDifficulty(selected);
              }}
            />
          </div>
          <span className="text-[20px] self-start">
            INSERIR IMAGENS PASSO-A-PASSO:
          </span>
          <ActivityImageInput isFormSent={isSendingData} />
          <span className="text-[20px] self-start">OBSERVAÇÕES:</span>
          <textarea
            className="bg-white rounded-[20px] resize-none p-2 w-[calc(50vw-1rem)] h-[calc(15vh-1rem)] border-[1px] border-solid border-cerBlue"
            name="observations"
            value={inputs.observations || ""}
            onChange={handleTextInputChange}
          />
        </form>
        <span className="text-[20px] self-start">INSERIR UTENSÍLIOS:</span>
        <ComboCheckBox
          dataFetchUrl="/items"
          contextType={ActivityFormContext}
          filterData={[]}
        />
        <button
          disabled={
            inputs.name === "" ||
            inputs.description === "" ||
            inputs.illnesses === "" ||
            inputs.observations === ""
          }
          type="submit"
          form="activityForm"
          className="my-4 bg-cerBlue text-white rounded-[20px] w-[calc(25vw-1rem)] h-[61px] mb-4 hover:bg-cerPurple flex items-center justify-center disabled:opacity-70 disabled:hover:bg-cerBlue"
        >
          {(isSendingData && <LoadingIcon />) || `CADASTRAR`}
        </button>
        <Toaster position="top-right" />
      </div>
    </ActivityFormContext.Provider>
  );
}

export default ActivityForm;
