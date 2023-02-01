import toast from "react-hot-toast";
import { PublicApi } from "../api";
import { getUser } from "./auth.service";

const logoutService = async () => {
  try {
    const userId = getUser();
    await PublicApi.post("/auth/logout", { userId: userId });

    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("userId");

    toast.success("Logout realizado com sucesso!");
  } catch (error: any) {
    toast.error("Erro inesperado.");
  }
};

export default logoutService;
