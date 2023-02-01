import { UploadSimple } from "phosphor-react";
import { createContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { PrivateApi } from "../../lib/api";
import { LoadingIcon } from "../icons/index";
import ComboCheckBox from "./ComboCheckBox";

type FormStringInputs = {
  name: string;
  illnesses: string;
  description: string;
  observations: string;
};

interface ActivityEditFormProps {
  id: string;
  name: string;
  illnesses: string;
  description: string;
  image: string;
  observations: string;
  itemsId: string[];
}

const ActivityEditFormContext = createContext<{
  context: string[];
  setContext: (newValue: any) => void;
  isFormSent: boolean;
}>({ context: [], setContext: () => undefined, isFormSent: false });

function ActivityEditForm({
  id,
  name,
  illnesses,
  description,
  image,
  observations,
  itemsId,
}: ActivityEditFormProps) {
  const [newItems, setNewItems] = useState<string[]>([]);
  const [inputs, setInputs] = useState<FormStringInputs>({
    name: "",
    illnesses: "",
    description: "",
    observations: "",
  });
  const [base64AcitivityImage, setBase64AcvitityImage] = useState<string>("");
  const [isSendingData, setIsSendingData] = useState<boolean>(false);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsSendingData(true);
    try {
      await PrivateApi.patch("/activities/" + id, {
        name: inputs.name || name,
        description: inputs.description || description,
        illnesses: inputs.illnesses || illnesses,
        observations: inputs.observations || observations,
        image: base64AcitivityImage || image,
        itemsId: newItems || itemsId,
      });
      toast.success("Atividade atualizada com sucesso!");
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

  const _handleNewImageReaderLoaded = (readerEvt: any) => {
    let binaryString = readerEvt.target.result;
    setBase64AcvitityImage(btoa(binaryString));
  };

  const onChange = (event: any) => {
    if (event.target.files === undefined || event.target.files === null) return;
    let file = event?.target?.files[0];
    if (file && event.target.id == "new-image-input-" + id) {
      const reader = new FileReader();
      reader.onload = _handleNewImageReaderLoaded;
      reader.readAsBinaryString(file);
    }
  };

  const onNewImageUploaded = (event: any) => {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    if (reader !== undefined && file !== undefined) {
      reader.onloadend = () => {
        setIsImageLoaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onDeleteClicked = async (event: any) => {
    event.preventDefault();
    toast.promise(PrivateApi.delete("activities/" + id), {
      success: "Atividade deletada com sucesso",
      loading: "Deletando atividade",
      error: "Erro ao tentar deletar atividade.",
    });
  };

  return (
    <ActivityEditFormContext.Provider
      value={{
        context: newItems,
        setContext: setNewItems,
        isFormSent: isSendingData,
      }}
    >
      <div className="flex flex-col items-center justify-center rounded-[20px] bg-cerGreen shadow-cerShadow w-[calc(60vw-1rem)] h-fit gap-y-2">
        <form
          className="w-full h-full flex flex-col items-center justify-center gap-y-4 mt-4"
          onSubmit={handleSubmit}
          onChange={onChange}
          id={`activityForm-${id}`}
        >
          <input
            type="text"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
            className="w-[calc(50vw-1rem)] h-[calc(10%-1rem)] rounded-[20px] p-4"
            placeholder={name}
          />
          <input
            type="text"
            name="illnesses"
            value={inputs.illnesses || ""}
            onChange={handleChange}
            className=" w-[calc(50vw-1rem)] h-[calc(10%-1rem)] rounded-[20px] p-4"
            placeholder={illnesses}
          />

          <textarea
            name="description"
            value={inputs.description || ""}
            onChange={handleChange}
            className="resize-none rounded-[20px] bg-white p-4 w-[calc(50vw-1rem)] h-[calc(20%-1rem)] mx-4"
            placeholder={description}
          />

          <label
            htmlFor={`new-image-input-${id}`}
            className="bg-cerBlue rounded-[20px] hover:bg-cerPurple hover:text-white w-1/6 h-[calc(15%-1rem)] group flex flex-row items-center justify-center cursor-pointer"
          >
            {(isImageLoaded && (
              <span className="text-center">Imagem carregada com sucesso</span>
            )) || (
              <>
                <UploadSimple className="w-6 h-6 group-hover:hidden" />
                <span className="max-w-0 group-hover:max-w-full text-center overflow-hidden transition-all duration-500 ease-linear">
                  Adicionar imagem
                </span>
              </>
            )}
            <input
              onChange={onNewImageUploaded}
              id={`new-image-input-${id}`}
              type="file"
              className="hidden"
              accept=".jpeg, .png, .jpg"
              name="image"
            />
          </label>

          <textarea
            name="observations"
            value={inputs.observations || ""}
            onChange={handleChange}
            className="resize-none rounded-[20px] bg-white p-4 w-[calc(50vw-1rem)] h-[calc(20%-1rem)]"
            placeholder={observations}
          />
        </form>

        <ComboCheckBox
          dataFetchUrl="/items/all"
          contextType={ActivityEditFormContext}
          filterData={itemsId}
        />

        <div className="w-full h-[calc(15%-1rem)] flex flex-row justify-between px-10 pb-4">
          <button
            form={`activityForm-${id}`}
            type="submit"
            className="rounded-[20px] bg-cerBlue w-[calc(30%-1rem)] h-[50px] hover:bg-cerPurple hover:text-white flex items-center justify-center"
          >
            {(isSendingData && <LoadingIcon />) || `EDITAR`}
          </button>
          <button
            onClick={onDeleteClicked}
            className="rounded-[20px] bg-cerPurple w-[calc(30%-1rem)] h-[50px] text-white hover:bg-cerBlue hover:text-black"
          >
            EXCLUIR
          </button>
        </div>

        <Toaster position="top-right" />
      </div>
    </ActivityEditFormContext.Provider>
  );
}

export default ActivityEditForm;
