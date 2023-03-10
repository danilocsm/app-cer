import { FormEvent, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import CloseButton from "../../components/CloseButton";
import { DefaultForm } from "../../components/forms";
import { LoadingIcon } from "../../components/icons";
import { PublicApi } from "../../lib/api";
import AddTestimonialButton from "../../components/testimonial-components/AddTestimonialButton";
import TestimonialField from "../../components/testimonial-components/TestimonialField";
import { useFetch } from "../../hooks/custom.hooks";
import { TestimonialObjectProps } from "../../lib/utils";

const scrollToRef = (ref: any) => {
  window.scrollTo(0, ref.current.offsetTop);
};

function Testimonials() {
  const [showNewTestimonialForm, setShowNewTestimonialForm] = useState(false);
  const myRef = useRef(null);
  const { data, loading } = useFetch<TestimonialObjectProps[]>(
    "/testimonials",
    []
  );

  const onButtonClick = () => {
    setShowNewTestimonialForm(true);
    setTimeout(() => {
      scrollToRef(myRef);
    }, 10);
  };

  const onSubmit = async (event: FormEvent, data: any) => {
    event.preventDefault();
    try {
      await PublicApi.post("/testimonials", {
        author: data.input1Value || undefined,
        subject: data.input2Value,
        text: data.textAreaValue,
      });
      toast.success("Depoimento adicionado com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao tentar enviar novo depoimento");
    } finally {
      setShowNewTestimonialForm(false);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 10);
    }
  };

  return (
    <div className="w-screen grid place-items-center overflow-x-hidden">
      <div className=" w-screen mt-2 flex items-center justify-center">
        <h1 className="text-[36px]">DEPOIMENTOS</h1>
      </div>
      <div className="grid place-items-center px-8 mt-2 w-[80vw]">
        <p className="text-[20px] text-center">
          Esta seção é dedicada para todos que quiserem postar algum tipo de
          experiência vivida com um parente próximo ou até mesmo pessoal. Clique
          no botão azul para contar um pouquinho sobre seu aprendizado com
          tratamentos de reabilitação.
        </p>
      </div>
      {loading ? (
        <div className="grid place-items-center my-4">
          <LoadingIcon />
        </div>
      ) : data.length === 0 ? (
        <h1 className="text-center text-[36px] my-4">
          NENHUM DEPOIMENTO CADASTRADO
        </h1>
      ) : (
        <div className="w-[80vw] h-[70vw] sm:h-[50vh] flex flex-col overflow-x-hidden overflow-y-auto items-center justify-between gap-y-4 my-4">
          {data.map((testimonial: any) => {
            return (
              <TestimonialField
                author={testimonial.author}
                text={testimonial.text}
                subject={testimonial.subject}
                key={testimonial.id}
              />
            );
          })}
        </div>
      )}
      {showNewTestimonialForm ? (
        <div ref={myRef} className="flex flex-row items-center justify-center">
          <DefaultForm
            input1Data={{
              label: "ESCREVA SEU NOME",
              placeholder: "OPCIONAL",
            }}
            input2Data={{ label: "ASSUNTO", placeholder: "ex: Assunto" }}
            textAreaData={{
              label: "DEPOIMENTO",
              placeholder: "clique aqui para escrever...",
            }}
            onSubmit={onSubmit}
          >
            <CloseButton onClick={() => setShowNewTestimonialForm(false)} />
          </DefaultForm>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <AddTestimonialButton onClick={onButtonClick} />
        </div>
      )}
      <Toaster position="top-right" />
    </div>
  );
}

export default Testimonials;
