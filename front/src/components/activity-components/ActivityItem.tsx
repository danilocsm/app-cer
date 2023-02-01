interface ActivityItemProps {
  name: string;
  description: string;
  img: string;
}

function ActivityItem({ name, description, img }: ActivityItemProps) {
  return (
    <div className="flex flex-col items-center justify-center w-[25vw] h-[45vh]">
      {img && (
        <img
          src={`data:image/png;base64, ${img}`}
          className="scale-90 w-[100%] h-[45%] rounded-[20px]"
        />
      )}
      <div className="w-full h-[55%] grid place-items-center">
        <h2 className="text-center text-[20px] font-bold">{name}</h2>
        <p className="text-center text-[14px] sm:text-[18px]">{description}</p>
      </div>
    </div>
  );
}

export default ActivityItem;
