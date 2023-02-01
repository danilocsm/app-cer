import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router";
import ActivityTag from "../../components/activity-components/ActivityTag";
import BackToButton from "../../components/BackToButton";
import { LoadingIcon } from "../../components/icons";
import { useFetch } from "../../hooks/custom.hooks";
import { ItemObjectProps } from "../../lib/utils";

function Item() {
  const item: ItemObjectProps = useLocation().state as ItemObjectProps;
  const { data, loading } = useFetch<string[]>(
    `/items/${item.id}/getActivities`,
    []
  );

  return (
    <div className="w-screen grid grid-flow-row place-items-center">
      <div className="grid grid-flow-col w-screen h-[calc(50vh-1rem)]">
        <div className="place-self-start m-4 rounded-[20px] w-[30vw] h-[30vh]">
          <img
            src={`data:image/png;base64, ${item.imageUrl}`}
            className="w-full h-full rounded-[20px]"
          />
        </div>
        <div className="w-[60vw] h-full overflow-y-auto flex flex-col scrollbar-thin scrollbar-track-cerBlue">
          <h1 className="text-[28px]">{item.name}</h1>
          <p className="text-[20px] text-left w-full pt-2">
            {item.description}
          </p>
        </div>
      </div>
      <a
        href={item.link}
        className="rounded-[20px] bg-cerPurple w-[25vw] h-[8vh] p-2 hover:bg-cerBlue hover:text-black text-white focus:outline-none focus:bg-cerBlue focus:text-black focus:border-[1px] focus:border-black flex items-center justify-center text-center"
      >
        Link para compra
      </a>

      <h1 className="text-center text-[36px] my-4">ATIVIDADES RELACIONADAS</h1>
      {(loading && <LoadingIcon />) ||
        (data.length === 0 && (
          <h1 className="text-center text-[24px]">
            {" "}
            Sem atividades cadastradas
          </h1>
        )) || (
          <div className="grid grid-cols-2 place-items-center gap-4 w-[calc(50vw-1rem)] h-[calc(25vh-1rem)] overflow-y-auto ">
            {data.map((activity) => {
              return <ActivityTag activityName={activity} />;
            })}
          </div>
        )}

      <BackToButton
        navigateTo="/items"
        buttonText="voltar para página de utensílios"
      />
      <Toaster position="top-right" />
    </div>
  );
}

export default Item;
