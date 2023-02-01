import { confirm } from "react-confirm-box";
import { Options } from "react-confirm-box/dist/types";
import { useNavigate } from "react-router-dom";
import logoutService from "../lib/services/logout.service";

const options: Options = {
  // @ts-ignore
  render: (message: string, onConfirm: () => void, onCancel: () => void) => {
    return (
      <>
        <div className="grid grid-flow-row place-items-center w-[calc(25vw-1rem)] h-[calc(20vh-1rem)] bg-cerGreen rounded-[20px] border-[1px] border-cerGreen shadow-cerShadow">
          <h1 className="text-[16px] text-center">{message}</h1>
          <div className="flex flex-rowplace-items-center w-full h-[calc(80%-1rem)] gap-x-4 px-2">
            <button
              onClick={onConfirm}
              className="rounded-[20px] bg-cerPurple w-[calc(80%-1rem)] h-full hover:text-white hover:border-[1px] hover:border-whiter"
            >
              Sim
            </button>
            <button
              onClick={onCancel}
              className="rounded-[20px] bg-cerPurple w-[calc(80%-1rem)] h-full hover:text-white hover:border-[1px] hover:border-whiter"
            >
              Não
            </button>
          </div>
        </div>
      </>
    );
  },
};

function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const result = await confirm("Tem certeza que deseja sair?", options);
    if (result) {
      await logoutService();
      navigate("/", { replace: true });
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="absolute top-0 right-4 bg-cerBlue rounded-[20px] h-[calc(10vh-2rem)] w-[calc(15vw-2rem)] hover:bg-cerPurple hover:text-white focus:outline-none focus:bg-cerPurple focus:text-white focus:border-[1px] focus:border-white"
    >
      Sair
    </button>
  );
}

export default LogoutButton;
