import { createContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { PrivateApi } from "../../lib/api";
import { LoadingIcon, UploadIcon } from "../icons/index";
import ComboCheckBox from "./ComboCheckBox";

interface ItemEditFormProps {
  id: string;
  name: string;
  price: number;
  link: string;
  description: string;
  image: string;
  activitiesId: string[];
}

const ItemEditFormContext = createContext<{
  context: string[];
  setContext: (newValue: any) => void;
  isFormSent: boolean;
}>({ context: [], setContext: () => undefined, isFormSent: false });

function ItemEditForm({
  id,
  name,
  price,
  link,
  description,
  image,
  activitiesId,
}: ItemEditFormProps) {
  const [inputs, setInputs] = useState<{
    name: string;
    price: string;
    link: string;
    description: string;
  }>({ name: "", price: "", link: "", description: "" });
  const [newActivities, setNewActivities] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<any>("");
  const [base64, setBase64] = useState<string>("");
  const [isSendingData, setIsSendingData] = useState<boolean>(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsSendingData(true);
    try {
      await PrivateApi.patch("/items/" + id, {
        name: inputs.name || name,
        price: inputs.price || price,
        link: inputs.link || link,
        description: inputs.description || description,
        imageUrl: base64 || image,
        activitiesId: newActivities || activitiesId,
      });
      toast.success("Item editado com sucesso!");
    } catch (error: any) {
      if (error.response.data.status === 403) {
        toast.error("Usuário não autenticado");
      } else toast.error("Erro inesperado");
    } finally {
      setIsSendingData(false);
    }

    setInputs({ name: "", price: "", link: "", description: "" });
    setImagePreview("");
  };

  const onInputChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onChange = (event: any) => {
    if (event.target.files === undefined || event.target.files === null) return;
    const file = event.target.files[0];
    if (file && event.target.id === "picture-input-" + id) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded;
      reader.readAsBinaryString(file);
    }
  };

  const _handleReaderLoaded = (readerEvt: any) => {
    let binaryString = readerEvt.target.result;
    setBase64(btoa(binaryString));
  };

  const photoUpload = (event: any) => {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];

    if (reader !== undefined && file !== undefined) {
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onDeleteClicked = async (event: any) => {
    event.preventDefault();
    toast.promise(PrivateApi.delete("items/" + id), {
      success: "Item deletado com sucesso",
      loading: "Deletando Item",
      error: "Erro ao tentar deletar Item.",
    });
  };

  return (
    <ItemEditFormContext.Provider
      value={{
        context: newActivities,
        setContext: setNewActivities,
        isFormSent: isSendingData,
      }}
    >
      <div className="flex flex-col items-center justify-center rounded-[20px] bg-cerGreen shadow-cerShadow w-[75%] h-fit gap-y-3">
        <form
          onChange={onChange}
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col items-center justify-center gap-y-4"
          id={`itemForm-${id}`}
        >
          <div className="w-full h-[calc(40%-1rem)] flex flex-row items-center justify-center gap-4 mt-2 ml-2">
            <label
              htmlFor={`picture-input-${id}`}
              className="bg-cerBlue rounded-[20px] cursor-pointer grid place-items-center w-[calc(45%-1rem)] h-[calc(25vh-1rem)]"
            >
              {imagePreview === "" ? (
                <div className="hover:animate-bounce flex flex-row items-center h-full">
                  <UploadIcon />
                  <span className="font-semibold text-[14px]">
                    Adicionar imagem
                  </span>
                </div>
              ) : (
                <img
                  src={imagePreview}
                  className="w-full h-full rounded-[20px]"
                />
              )}
              <input
                type="file"
                id={`picture-input-${id}`}
                className="hidden"
                accept=".jpeg, .png, .jpg"
                onChange={(event) => photoUpload(event)}
                name="image"
              />
            </label>
            <div className="w-full h-[calc(45%-1rem)] flex flex-col items-start justify-center gap-y-4">
              <input
                type="text"
                name="name"
                placeholder={name}
                value={inputs.name || ""}
                onChange={onInputChange}
                id="name"
                className="w-[calc(100%-2rem)] h-[calc(10%-1rem)] rounded-[20px] border-[1px] border-cerBlue bg-white p-4"
              />
              <input
                type="number"
                name="price"
                value={inputs.price || ""}
                onChange={onInputChange}
                placeholder={price?.toString()}
                id="price"
                step="0.1"
                className="w-[calc(100%-2rem)] h-[calc(10%-1rem)] rounded-[20px] border-[1px] border-cerBlue bg-white p-4"
              />
              <input
                type="url"
                name="link"
                value={inputs.link || ""}
                onChange={onInputChange}
                id="link"
                className="w-[calc(100%-2rem)] h-[calc(10%-1rem)] rounded-[20px] border-[1px] border-cerBlue bg-white p-4"
                placeholder={link}
              />
            </div>
          </div>

          <textarea
            value={inputs.description || ""}
            name="description"
            onChange={onInputChange}
            placeholder={description}
            className="resize-none p-4 rounded-[20px] w-[calc(50vw-1rem)] h-[calc(15vh-1rem)]"
          />
        </form>

        <ComboCheckBox
          dataFetchUrl="/activities/all"
          contextType={ItemEditFormContext}
          filterData={activitiesId}
        />

        <div className="flex flex-row w-full gap-x-4 justify-end px-4 mb-2">
          <button
            form={`itemForm-${id}`}
            type="submit"
            className="rounded-[20px] bg-cerBlue w-[200px] h-[50px] hover:bg-cerPurple hover:text-white flex items-center justify-center"
          >
            {(isSendingData && <LoadingIcon />) || `EDITAR`}
          </button>
          <button
            onClick={onDeleteClicked}
            className="rounded-[20px] bg-cerPurple w-[200px] h-[50px] text-white hover:bg-cerBlue hover:text-black"
          >
            EXCLUIR
          </button>
        </div>

        <Toaster position="top-right" />
      </div>
    </ItemEditFormContext.Provider>
  );
}

export default ItemEditForm;
