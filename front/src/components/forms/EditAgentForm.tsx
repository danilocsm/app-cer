import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { PrivateApi } from "../../lib/api";
import { CheckIcon, LoadingIcon } from "../icons/index";

interface EditAgentFormProps {
  userId: string;
  name: string;
  email: string;
}

function EditAgentForm({ userId, name, email }: EditAgentFormProps) {
  const [inputs, setInputs] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });
  const [base64, setBase64] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<any>("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await PrivateApi.patch("/users/" + userId, {
        username: inputs.name || undefined,
        email: inputs.email || undefined,
        picture: base64 || undefined,
      });
      toast.success("Usuário editado com sucesso!");
      setInputs({
        name: "",
        email: "",
      });
      setImagePreview("");
    } catch (error: any) {
      console.table(error.response);
      toast.error("Erro ao enviar formulário");
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onProfilePictureFormChange = (event: any) => {
    if (event.target.files === undefined || event.target.files === null) return;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = _handleProfilePictureLoaded;
      reader.readAsBinaryString(file);
    }
  };

  const _handleProfilePictureLoaded = (readerEvt: any) => {
    let binaryString = readerEvt.target.result;
    setBase64(btoa(binaryString));
  };

  const profilePictureUpload = (event: any) => {
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
    <form
      onChange={onProfilePictureFormChange}
      onSubmit={handleSubmit}
      className="relative w-[calc(50vw-1rem)] h-[calc(50%-1rem)] grid grid-flow-row gap-y-4 place-items-center"
    >
      <label
        htmlFor="profilePictureInput"
        className="rounded-[20px] w-[202px] h-[50px] shadow-cerShadow bg-cerBlue items-center justify-center flex cursor-pointer hover:bg-cerPurple"
      >
        {(imagePreview && <CheckIcon className="w-full h-full" />) ||
          `Inserir foto`}
        <input
          type="file"
          className="hidden"
          id="profilePictureInput"
          onChange={profilePictureUpload}
        />
      </label>
      <span className="place-self-start text-[20px]">Novo nome:</span>
      <input
        className="w-full rounded-[20px] bg-white p-2"
        type="text"
        id="nameInput"
        name="name"
        value={inputs.name || ""}
        onChange={onChange}
        placeholder={name}
      />
      <span className="place-self-start text-[20px]">Novo email:</span>
      <input
        type="email"
        id="emailInput"
        name="email"
        className="w-full rounded-[20px] bg-white p-2"
        value={inputs.email || ""}
        onChange={onChange}
        placeholder={email}
      />
      <button
        type="submit"
        className="rounded-[20px] bg-cerBlue grid place-items-center hover:bg-cerPurple hover:text-white  focus:outline-none focus:border-[1px] focus:border-white focus:bg-cerPurple focus:text-white shadow-cerShadow w-[25%] h-[5vh]"
      >
        {(isLoading && <LoadingIcon />) || "Editar"}
      </button>
      <Toaster position="top-right" />
    </form>
  );
}

export default EditAgentForm;
