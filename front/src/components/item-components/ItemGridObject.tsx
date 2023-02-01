import { useNavigate } from "react-router-dom";
import { ItemObjectProps } from "../../lib/utils";

interface ItemGridObjectProps {
  itemData: ItemObjectProps;
  buttonText: string;
}

function ItemGridObject({ itemData, buttonText }: ItemGridObjectProps) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/items/detail/" + itemData.name, {
      replace: true,
      state: { ...itemData },
    });
  };

  return (
    <div className="flex flex-col w-[24vw] h-[50vh] items-center justify-center">
      <div className="h-[40%] w-full rounded-[20px] border-cerBlue border-[1px] bg-cerGreen">
        {itemData.imageUrl && (
          <img
            src={`data:image/png;base64, ${itemData.imageUrl}`}
            className="scale-85 w-full h-full rounded-[20px]"
          />
        )}
      </div>
      <span className="text-[20px] grid place-items-center text-center w-full h-[30%]">
        {itemData.name.toUpperCase()}
      </span>
      <button
        className="w-full h-[20%] sm:h-[15%] rounded-[20px] bg-cerBlue grid place-items-center text-center py-2 hover:bg-cerPurple transition-all ease-in-out focus:border-4 focus:border-cerPurple focus:outline-none text-[18px] focus:text-white"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default ItemGridObject;
