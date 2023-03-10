import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router";
import { ActivityItem } from "../../components/activity-components/";
import BackToButton from "../../components/BackToButton";
import Gallery from "../../components/gallery/Gallery";
import { LoadingIcon } from "../../components/icons";
import { useFetch } from "../../hooks/custom.hooks";
import { ActivityObjectProps, ItemObjectProps } from "../../lib/utils";

function Activity() {
  const activity: ActivityObjectProps = useLocation()
    .state as ActivityObjectProps;
  const { data, loading } = useFetch<ItemObjectProps[]>(
    `/activities/${activity.id}/items`,
    []
  );

  return (
    <div className="w-100vw grid place-items-center">
      <h1 className="mt-4 mb-4 text-[36px] text-center">
        {activity.name.toUpperCase()}
      </h1>
      <div className="w-screen flex flex-col items-center justify-center">
        <p className="px-2 text-[20px] text-center">{activity.description}</p>
        <h2 className="text-center mt-2">
          <span className="font-bold text-[20px]">
            Síndromes e doenças em foco:
          </span>{" "}
          {activity.illnesses ? (
            <span className="text-[18px]">{activity.illnesses}</span>
          ) : (
            <span className="text-[18px]">Sem doenças cadastradas</span>
          )}
        </h2>
      </div>
      <div className="flex w-[60vw] h-[30vh] items-center justify-center">
        <img
          className="w-full h-full scale-105"
          src={`data:image/png;base64,${activity.image}`}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="mt-4 text-[30px] text-center">
          UTENSÍLIOS QUE PODEM AUXILIAR:
        </h2>
        {(loading && <LoadingIcon />) || (
          <Gallery>
            {data.length ? (
              data.map((object) => {
                return (
                  <ActivityItem
                    key={object.name}
                    name={object.name.toUpperCase()}
                    description={object.description}
                    img={object.imageUrl}
                  />
                );
              })
            ) : (
              <h1 className="w-fit text-center">
                Sem utensílios cadastrados para esta atividade
              </h1>
            )}
          </Gallery>
        )}
      </div>
      <h2 className="mt-4 text-[30px] text-center">OBSERVAÇÕES IMPORTANTES:</h2>
      <p className="mt-2 mb-4 text-center px-2 text-[20px]">
        {activity.observations}
      </p>
      <BackToButton
        navigateTo="/activities"
        buttonText="Voltar para página de atividades"
      />
      <Toaster position="top-right" />
    </div>
  );
}

export default Activity;
