import { MdClear } from "react-icons/md";

interface CloseButtonProps {
  onClick: () => void;
}

function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-cerBlue w-[30px] h-[30px] hover:bg-cerPurple hover:text-white focus:outline-none focus:bg-cerPurple focus:text-white transform ease-in-out rounded-[20px] flex items-center justify-center"
    >
      <MdClear />
    </button>
  );
}

export default CloseButton;
