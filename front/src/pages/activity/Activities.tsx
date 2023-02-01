import { Toaster } from "react-hot-toast";
import { ActivityGridObject } from "../../components/activity-components/";
import { LoadingIcon } from "../../components/icons/index";
import SearchBar from "../../components/searchbar/SearchBar";
import { useFetch } from "../../hooks/custom.hooks";
import { ActivityObjectProps } from "../../lib/utils";

function Activities() {
  const { data, loading } = useFetch<ActivityObjectProps[]>(
    "/activities/all",
    []
  );

  return (
    <div className="w-100vw grid place-items-center">
      <h1 className="text-center text-[36px] mt-2">ATIVIDADES</h1>
      <div className="w-screen flex h-1/7 justify-center items-center overflow-x-hidden">
        <p className="text-center text-[24px] px-2">
          Navegue pelo nosso repositório de atividades. Nesta seção, você pode
          pesquisar por atividades que podem ser essenciais para o trabalho de
          reabilitação de nossos pacientes. Basta clicar em algum dos links
          abaixo ou pesquisar por atividades específicas.
        </p>
      </div>
      <div className="w-screen flex flex-col items-center justify-center mt-4">
        <h1 className="text-[30px] "> FAÇA SUA BUSCA </h1>
      </div>
      <div className="flex items-center justify-center w-[80vw] h-fit px-6">
        {loading ? <LoadingIcon /> : <SearchBar activities={data} />}
      </div>
      <div className="w-screen h-fit flex flex-col items-center justify-center md:pl-10 mb-4 overflow-x-hidden">
        <h1 className="text-[36px] py-6 text-center">ATIVIDADES DISPONÍVEIS</h1>
        {loading ? (
          <div className="justify-self-center mt-6">
            <LoadingIcon />
          </div>
        ) : data.length === 0 ? (
          <h1 className="text-[36px] mt-4 text-center">{`Nenhuma atividade cadastrada.`}</h1>
        ) : (
          <div className="grid lg:grid-cols-4 grid-cols-2 w-screen place-items-center gap-x-14 px-8 overflow-x-hidden">
            {data.map((activity: any) => {
              return (
                <ActivityGridObject
                  activityData={activity}
                  buttonText="saiba mais"
                  key={activity.name}
                />
              );
            })}
          </div>
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default Activities;
