import { useState } from "react";
import { Toaster } from "react-hot-toast";
import registerService from "../../lib/services/register.service";
import { LoadingIcon } from "../icons";

interface RegisterFormProps {
  sideEffect: () => void;
}

function RegisterForm({ sideEffect }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputs, setInputs] = useState<{
    username: string;
    email: string;
    password: string;
    picture: string;
  }>({ username: "", email: "", password: "", picture: "" });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    await registerService(inputs);
    sideEffect();
    setIsLoading(false);
  };

  const onChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className="w-full p-4 grid place-items-center py-10">
      <form
        className="w-[calc(60%-2rem)] grid grid-flow-row place-items-center rounded-[20px] bg-cerGreen shadow-cerShadow gap-y-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-[36px] font-bold">
          REGISTRO PARA AGENTES DE SAÚDE
        </h1>
        <span className="text-[20px]">NOME:</span>
        <input
          onChange={onChange}
          name="username"
          value={inputs.username || ""}
          type="text"
          className="w-[calc(90%-2rem)] rounded-[20px] bg-white p-2"
          placeholder="Digite seu nome..."
        />
        <span className="text-[20px]">E-MAIL:</span>
        <input
          onChange={onChange}
          name="email"
          value={inputs.email || ""}
          type="text"
          className="w-[calc(90%-2rem)] rounded-[20px] bg-white p-2"
          placeholder="Digite um e-mail válido..."
        />
        <span className="text-[20px]">NOVA SENHA:</span>
        <input
          onChange={onChange}
          name="password"
          value={inputs.password || ""}
          type="password"
          className="w-[calc(90%-2rem)] rounded-[20px] bg-white p-2"
          placeholder="Digite sua senha..."
        />
        <button
          disabled={
            inputs.username === "" ||
            inputs.email === "" ||
            inputs.password === ""
          }
          type="submit"
          className="place-self-end rounded-[20px] bg-cerBlue w-[100px] h-[60px] mr-10 mb-2 hover:bg-cerPurple hovert:text-white focus:border-2 focus:border-white focus:text-white focus:outline-none disabled:opacity-75 disabled:hover:opacity-70 transition-all ease-in-out grid place-items-center"
        >
          {(isLoading && <LoadingIcon />) || `REGISTRAR`}
        </button>
      </form>
      <Toaster position="top-right" />
    </div>
  );
}

export default RegisterForm;
