import { useNavigate } from "react-router-dom";

interface BackToButtonProps {
  navigateTo: string;
  buttonText: string;
}

function BackToButton({ navigateTo, buttonText }: BackToButtonProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(navigateTo);
  };
  return (
    <button
      onClick={handleClick}
      className="self-center rounded-[20px] bg-cerBlue w-[35vw] h-fit sm:h-[10vh] p-2 focus:outline-none hover:bg-cerPurple focus:border-white focus:border-1 hover:text-white focus:text-white focus:bg-cerPurple my-4"
    >
      {buttonText.toUpperCase()}
    </button>
  );
}

export default BackToButton;
