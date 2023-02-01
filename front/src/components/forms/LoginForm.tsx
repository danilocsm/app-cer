import { FormEvent, useState } from "react";
import { Toaster } from "react-hot-toast";
import loginService from "../../lib/services/login.service";
import { LoadingIcon } from "../icons/index";

interface LoginFormProps {
  sideEffect: () => void;
}

function LoginForm({ sideEffect }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSigningIn(true);
    await loginService(email, password);
    setIsSigningIn(false);
    sideEffect();
  };

  return (
    <div className="w-full p-4 grid place-items-center">
      <form
        className="w-[60%] sm:w-[40%]  bg-cerGreen flex flex-col items-center justify-start gap-6 rounded-[20px] shadow-cerShadow p-2"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-[28px] font-bold">
          LOGIN PARA AGENTES DE SAÚDE
        </h1>
        <span className="text-center text-[20px] mt-2">E-MAIL:</span>
        <input
          type="text"
          name="email"
          className="w-[90%] bg-white rounded-[20px] p-2"
          placeholder="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          value={email}
        />
        <span className="text-center text-[20px]">SENHA:</span>
        <input
          type="password"
          name="password"
          className="w-[90%] bg-white rounded-[20px] p-2"
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <button
          type="submit"
          disabled={email.length === 0 || password.length === 0}
          className="self-end rounded-[20px] bg-cerBlue w-[25%] h-[20%] hover:bg-cerPurple hovert:text-white focus:border-2 focus:border-white focus:text-white focus:outline-none disabled:opacity-75 disabled:hover:opacity-70 transition-all ease-in-out grid place-items-center"
        >
          {(isSigningIn && <LoadingIcon />) || "Entrar"}
        </button>
      </form>
      <Toaster position="top-right" />
    </div>
  );
}

export default LoginForm;
