import { Toaster } from "react-hot-toast";
import { LoadingIcon } from "../icons/index";
import UpdateButton from "../UpdateButton";
import { ActivityEditForm } from "../forms";
import { useFetch } from "../../hooks/custom.hooks";
import { ActivityObjectProps } from "../../lib/utils";

function ActivitiesDashboard() {
  const { data, loading, refetch } = useFetch<ActivityObjectProps[]>(
    "/activities",
    []
  );

  return (
    <div className="w-screen flex flex-col items-center justify-center gap-y-8">
      <div className="relative grid grid-flow-col place-items-center w-full">
        <h1 className="text-[36px]">ATIVIDADES REGISTRADAS:</h1>
        <UpdateButton
          onClick={() => refetch()}
          style={`top-0 right-4 bg-cerBlue rounded-[20px] h-[5vh] w-[15vw] hover:bg-cerPurple hover:text-white focus:outline-none focus:bg-cerPurple focus:text-white focus:border-[1px] focus:border-white`}
        />
      </div>
      {(loading && <LoadingIcon />) ||
        (data.length > 0 &&
          data.map((activity: any) => {
            return <ActivityEditForm {...activity} key={activity.id} />;
          })) || <h1 className="text-[36px]">Sem atividades cadastradas</h1>}
      <Toaster position="top-right" />
    </div>
  );
}

export default ActivitiesDashboard;
