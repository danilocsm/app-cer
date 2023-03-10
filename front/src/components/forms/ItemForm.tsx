import { createContext } from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { PrivateApi } from "../../lib/api";
import { LoadingIcon, UploadIcon } from "../icons/index";
import { ItemsOptionsLayout } from "../item-components";
import { ComboCheckBox } from "./index";

const parseItemType = (itemType: string) => {
  switch (itemType) {
    case "BRINQUEDOS":
      return "TOY";
    case "MOBILIÁRIO":
      return "ACCESSORY";
    case "VESTUÁRIO":
      return "CLOATHING";
    case "ALIMENTAÇÃO":
      return "FOOD";
  }
};

const ItemFormContext = createContext<{
  context: string[];
  setContext: (newValue: any) => void;
  isFormSent: boolean;
}>({ context: [], setContext: () => undefined, isFormSent: false });

function ItemForm() {
  const [inputs, setInputs] = useState<{
    name: string;
    price: string;
    description: string;
    link: string;
  }>({ name: "", price: "", link: "", description: "" });
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [itemType, setItemType] = useState("");
  const [imagePreview, setImagePreview] = useState<any>("");
  const [base64, setBase64] = useState<string>("");
  const [isSendingData, setIsSendingData] = useState<boolean>(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsSendingData(true);
    try {
      await PrivateApi.post("/items", {
        name: inputs.name,
        link: inputs.link,
        description: inputs.description,
        price: parseFloat(inputs.price),
        imageUrl: base64,
        itemType: parseItemType(itemType.toUpperCase()),
        activitiesId: selectedActivities,
      });
      toast.success("Item criado com sucesso!");
    } catch (error: any) {
      if (error.response.data.status === 403)
        toast.error("Usuário não autenticado");
      else if (error.response.data.status === 400)
        toast.error("Campos inválidos");
      else toast.error("Erro inesperado.");
    } finally {
      setIsSendingData(false);
    }

    setInputs({ name: "", price: "", link: "", description: "" });
    setImagePreview("");
    setSelectedActivities([]);
  };

  const onInputChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onChange = (event: any) => {
    if (event.target.files === undefined || event.target.files === null) return;
    const file = event.target.files[0];
    if (file) {
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

  return (
    <ItemFormContext.Provider
      value={{
        context: selectedActivities,
        setContext: setSelectedActivities,
        isFormSent: isSendingData,
      }}
    >
      <div className="flex flex-col items-center justifty-center w-screen px-4 overflow-hidden gap-y-8">
        <h1 className="text-[36px] my-2">CADASTRO DE UM UTENSÍLIO</h1>
        <form
          onChange={onChange}
          onSubmit={handleSubmit}
          className="w-screen flex flex-row h-full items-center justify-center"
          id="itemForm"
        >
          <div className="w-1/4 flex flex-col items-center justify-center gap-y-4">
            <label
              htmlFor="pictureInput"
              className="bg-cerBlue rounded-[20px]  cursor-pointer flex items-center justify-center w-[20vw] h-[20vw]"
            >
              {imagePreview === "" ? (
                <div className="hover:animate-bounce flex flex-row items-center">
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
                id="pictureInput"
                className="hidden"
                accept=".jpeg, .png, .jpg"
                onChange={(event) => photoUpload(event)}
                name="image"
              />
            </label>
          </div>
          <div className="w-3/4 flex flex-col items-start justify-center">
            <label htmlFor="name" className="text-[20px]">
              NOME DO PRODUTO:
            </label>
            <input
              autoFocus={true}
              type="text"
              name="name"
              value={inputs.name || ""}
              onChange={onInputChange}
              id="name"
              className="w-[70vw] h-[59px] rounded-[20px] border-[1px] border-cerBlue bg-white p-4"
            />
            <label htmlFor="price" className="text-[20px]">
              PREÇO:
            </label>
            <input
              type="number"
              name="price"
              value={inputs.price || ""}
              onChange={onInputChange}
              id="price"
              step="0.1"
              className="w-[70vw] h-[59px] rounded-[20px] border-[1px] border-cerBlue bg-white p-4"
            />
            <label htmlFor="link" className="text-[20px]">
              LINK PARA COMPRA:
            </label>
            <input
              type="url"
              name="link"
              value={inputs.link || ""}
              onChange={onInputChange}
              id="link"
              className="w-[70vw] h-[59px] rounded-[20px] border-[1px] border-cerBlue bg-white p-4"
              placeholder="http://example.com"
            />
          </div>
        </form>
        <div className="w-[calc(50vw-1rem)] flex flex-col items-center justify-center pl-4">
          <label className="text-[20px]"> SELECIONE O TIPO:</label>
          <ItemsOptionsLayout
            onOptionSelected={(selected) => setItemType(selected)}
            autoSelectFirst={false}
          />
        </div>
        <label htmlFor="description" className="text-[22px]">
          DESCRIÇÃO
        </label>
        <textarea
          value={inputs.description || ""}
          name="description"
          onChange={onInputChange}
          placeholder="Adicionar descrição"
          className="resize-none p-4 rounded-[20px] w-[calc(50vw-1rem)] h-[calc(25vh-1rem)]"
        />
        <span className="text-[22px]"> ATIVIDADES RELACIONADAS:</span>
        <ComboCheckBox
          dataFetchUrl="/activities"
          contextType={ItemFormContext}
          filterData={[]}
        />
        <button
          disabled={
            inputs.name === "" ||
            inputs.link === "" ||
            inputs.price === "" ||
            inputs.description === "" ||
            itemType === ""
          }
          form="itemForm"
          type="submit"
          className="bg-cerBlue text-white rounded-[20px] w-[50vw] md:w-[566px] md:h-[61px] mb-4 hover:bg-cerPurple disabled:opacity-70 disabled:hover:bg-cerBlue flex items-center justify-center"
        >
          {(isSendingData && <LoadingIcon />) || `CADASTRAR`}
        </button>
        <Toaster position="top-right" />
      </div>
    </ItemFormContext.Provider>
  );
}

export default ItemForm;
