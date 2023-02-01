import { InstagramLogo } from "phosphor-react";
import { Toaster } from "react-hot-toast";
import { HomeLogo } from "../../components/icons";
import SectionContainer from "../../components/SectionContainer";

const sections = [
  {
    name: "Atividades",
    brief:
      "Clique no botão para conhecer a nossa seção de atividades para realizar com seus familiares",
    page: "/activities",
  },
  {
    name: "Utensílios",
    brief:
      "Clique no botão para conhecer nossa lista de utensílios para ajudar no tratamento dos seus familiares",
    page: "/items",
  },
  {
    name: "Depoimentos",
    brief:
      "Clique no botão para prestar um depoimento sobre o tratamento de um familiar",
    page: "/testimonials",
  },
  {
    name: "Dúvidas",
    brief: "Clique no botão para enviar uma dúvida para nossos profissionais",
    page: "/help",
  },
];

function HomePage() {
  return (
    <div className="w-screen grid place-items-center">
      <div className="flex flex-row items-center justify-center w-screen">
        <h1 className="text-3xl text-black mt-4 text-center">
          CONHEÇA MAIS NOSSO PROJETO
        </h1>
      </div>
      <div className="flex flex-row items-center justify-center w-screen">
        <p className="text-[20px] text-black mt-2 text-center px-2">
          Centro Especializado em Reabilitação (CER) é um ponto de atendimento
          especializado em reabilitação, que tem como objetivo realizar
          diagnóstico, avaliação, orientação, estimulação precoce e atendimento
          especializado em reabilitação, concessão, adaptação e manutenção de
          tecnologia assistiva, constituindo-se em referência para a rede de
          atenção à saúde no território. A Lei Brasileira de Inclusão (LBI), nº
          13.146, de 06 de julho de 2015, considera a pessoa com deficiência
          aquela que tem impedimento de longo prazo de natureza física, mental,
          intelectual ou sensorial, o qual, em interação com uma ou mais
          barreiras, pode obstruir sua participação plena e efetiva na sociedade
          em igualdade de condições com as demais pessoas.
        </p>
      </div>
      <div className="flex flex-row w-screen items-center justify-center">
        <div className="h-fit px-2">
          <p className="text-[20px] text-black mt-4  pr-4 text-center">
            Centro Especializado em Reabilitação - CER IV Campina Grande/PB
            Localizado na Rua Luiz Mota, S/N. Bairro Bodocongó. Oferece serviço
            de habilitação e reabilitação a pessoas com deficiência Física,
            Intelectual, Auditiva e Visual. Atendendo também o público de várias
            cidades circunvizinhas pactuadas com a prefeitura municipal. O CER
            oferece atendimento individual e suporte familiar com abordagem
            multidisciplinar e conta com profissionais especializados nas áreas
            de terapias : fisioterapia, terapia ocupacional, fonoaudiologia,
            psicologia, pedagogia e serviço social e clínicas O público pode ter
            acesso ao serviço através de encaminhamentos da rede de atenção a
            saúde ou por demanda espontânea. médicas :pediatra, neurologista,
            endocrinologista, urologista, oftalmologista, enfermagem. Se for
            realizado uma triagem inicial e em seguidas o usuário é direcionado
            para terapias e consultas médicas. Caso o usuário não tenha perfil
            para ser atendido no serviço é encaminhado para outros serviços da
            rede.
          </p>
        </div>
      </div>
      <div className="w-[80vw] h-fit grid grid-cols-2 place-items-center gap-4 mt-4 px-8">
        {sections.map((section) => {
          return (
            <SectionContainer
              name={section.name.toUpperCase()}
              brief={section.brief}
              page={section.page}
              key={section.name}
            />
          );
        })}
      </div>

      <footer className="w-[calc(40vw-1rem)] h-[calc(15vh-1rem)] mx-4 grid grid-flow-col place-items-center">
        {`Telefone: (83) 3333-2830`}
        <a href="https://www.instagram.com/ceriv_cg/">
          <InstagramLogo size={40} />
        </a>
      </footer>
      <Toaster position="top-right" />
    </div>
  );
}

export default HomePage;
