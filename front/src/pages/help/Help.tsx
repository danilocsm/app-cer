import { AxiosError } from "axios";
import { FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { DefaultForm } from "../../components/forms";
import { PublicApi } from "../../lib/api";

function Help() {
  const onSubmit = async (event: FormEvent, data: any) => {
    event.preventDefault();
    try {
      await PublicApi.post("/questions", {
        name: data.input1Value,
        contactEmail: data.input2Value,
        text: data.textAreaValue,
      });
      toast.success("Dúvida enviada com sucesso");
    } catch (error) {
      toast.error("Não foi possível enviar sua dúvida, tente novamente.");
    }
  };

  return (
    <>
      <div className="w-100vw grid items-center justify-center">
        <div className="text-center mt-4">
          <h1 className="text-[36px]">TIRE SUA DÚVIDA AQUI</h1>
        </div>
        <div className="md:px-[135px] mt-4">
          <p className="text-[20px] text-center">
            Esta seção é dedicada para que você nos envie qualquer tipo de
            dúvida que tiver em relação ao nosso trabalho no CER. Preenchar os
            campos abaixo com seu nome e um e-mail válido que responderemos a
            sua pergunta assim que tivermos a oportunidade.
          </p>
        </div>
        <DefaultForm
          input1Data={{
            label: "ESCREVA SEU NOME",
            placeholder: "ex: Maria José da Silva",
          }}
          input2Data={{
            label: "E-MAIL PARA CONTATO",
            placeholder: "ex: mariajose@email.com",
          }}
          textAreaData={{
            label: "ESCREVA SUA DÚVIDA",
            placeholder: "clique aqui para escrever...",
          }}
          onSubmit={onSubmit}
        />
        <Toaster position="top-right" />
      </div>
    </>
  );
}

export default Help;
