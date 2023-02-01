import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PublicApi } from "../../lib/api";

interface ActivityTagProps {
  activityName: string;
}

function ActivityTag({ activityName }: ActivityTagProps) {
  const navigate = useNavigate();

  const onClick = () => {
    toast.promise(
      PublicApi.get("/activities/" + activityName.trim()).then((response) => {
        if (response.data.name !== undefined)
          navigate("/activities/detail/" + response.data.name, {
            replace: true,
            state: { ...response.data },
          });
      }),
      {
        loading: "Buscando atividade...",
        success: "Atividade recuperada com sucesso",
        error: "Erro inesperado",
      }
    );
  };

  return (
    <button
      className="bg-cerBlue rounded-[20px] w-[calc(20vw-1rem)] h-[50px] hover:bg-cerPurple hover:text-white"
      onClick={onClick}
    >
      {activityName}
    </button>
  );
}

export default ActivityTag;
