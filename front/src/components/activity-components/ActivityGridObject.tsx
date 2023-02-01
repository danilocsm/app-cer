import { useNavigate } from "react-router-dom";
import { ActivityObjectProps } from "../../lib/utils";

interface ActivityGridObjectProps {
  activityData: ActivityObjectProps;
  buttonText: string;
}

function ActivityGridObject({
  activityData,
  buttonText,
}: ActivityGridObjectProps) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/activities/detail/" + activityData.name, {
      replace: true,
      state: { ...activityData },
    });
  };

  return (
    <div className="flex flex-col w-[24vw] h-[50vh] items-center justify-center">
      <div className="h-[40%] w-full rounded-[20px] border-cerBlue border-[1px] bg-cerGreen">
        {activityData.image && (
          <img
            src={`data:image/png;base64, ${activityData.image}`}
            className="scale-85 w-full h-full rounded-[20px]"
          />
        )}
      </div>
      <span className="grid place-items-center text-[20px] text-center w-full h-[30%]">
        {activityData.name.toUpperCase()}
      </span>
      <button
        className="w-full h-[20%] sm:h-[15%] rounded-[20px] bg-cerBlue text-center py-2 hover:bg-cerPurple transition-all ease-in-out focus:border-4 focus:border-cerPurple focus:outline-none text-[20px] focus:text-white"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default ActivityGridObject;
