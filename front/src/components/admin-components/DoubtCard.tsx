import { useState } from "react";
import toast from "react-hot-toast";
import { PrivateApi } from "../../lib/api";
import { LoadingIcon } from "../icons/index";

interface DoubtCardProps {
  id: string;
  name: string;
  email: string;
  text: string;
}

function DoubtCard({ id, name, email, text }: DoubtCardProps) {
  const [isSending, setIsSending] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsSending(true);
    try {
      await PrivateApi.patch("/questions/" + id, {
        answer: answer,
        contactEmail: email,
      });
      toast.success("Dúvida respondida com sucesso!");
      setAnswer("");
    } catch (error: any) {
      if (error.response.data.status === 403) {
        toast.error("Usuário não autenticado");
      } else toast.error("Erro inesperado!");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="shadow-cerShadow bg-cerGreen rounded-[20px] flex flex-col items-center justify-center sm:w-[65vw] w-[80vw] h-[60vh] ">
      <div className="flex flex-col h-[55%] p-3 w-full justify-start">
        <span className="text-[26px]">{email}</span>
        <span className="text-[26px]">{name}</span>
        <p className="text-[18px] pl-2 overflow-y-auto scrollbar-thin scrollbar-track-cerBlue">
          {text}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full h-[45%] gap-y-3 px-3"
      >
        <label className="text-[20px] self-start">RESPOSTA:</label>
        <textarea
          value={answer}
          onChange={(event: any) => setAnswer(event.target.value)}
          className="resize-none p-4 bg-white rounded-[20px] w-[90%] h-[60%]"
          placeholder="Escreva a resposta aqui..."
        />
        <button
          disabled={answer.length === 0}
          className="flex items-center justify-center rounded-[20px] bg-cerBlue self-end w-[25%] h-[15%] hover:bg-cerPurple hover:text-white focus:outline-none focus:bg-cerPurple focus:text-white disabled:opacity-70 disabled:hover:bg-cerBlue"
        >
          {(isSending && <LoadingIcon />) || `ENVIAR`}
        </button>
      </form>
    </div>
  );
}

export default DoubtCard;
