import { Toaster } from "react-hot-toast";
import { useFetch } from "../../hooks/custom.hooks";
import { DoubtObjectProps } from "../../lib/utils";
import { LoadingIcon } from "../icons/index";
import UpdateButton from "../UpdateButton";
import DoubtCard from "./DoubtCard";

function DoubtsDashboard() {
  const { data, loading, refetch } = useFetch<DoubtObjectProps[]>(
    "/questions/all",
    []
  );

  return (
    <div className="w-screen flex flex-col gap-y-4 items-center justify-center mt-4">
      <div className="relative grid grid-flow-col place-items-center w-full">
        <h1 className="text-[36px]">DÚVIDAS ENVIADAS:</h1>
        <UpdateButton
          onClick={() => refetch()}
          style={`top-0 right-4 bg-cerBlue rounded-[20px] h-[5vh] w-[15vw] hover:bg-cerPurple hover:text-white focus:outline-none focus:bg-cerPurple focus:text-white focus:border-[1px] focus:border-white`}
        />
      </div>
      <div className="grid grid-flow-row grid-rows-3 gap-y-6 overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-track-cerBlue">
        {(loading && <LoadingIcon />) ||
          (data.length > 0 &&
            data.map((doubt) => {
              return (
                !doubt.isAnswered && (
                  <DoubtCard
                    id={doubt.id}
                    name={doubt.name}
                    email={doubt.contactEmail}
                    text={doubt.text}
                    key={doubt.id}
                  />
                )
              );
            })) || (
            <h1 className="text-[36px] text-center">SEM DÚVIDAS CADASTRADAS</h1>
          )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default DoubtsDashboard;
