import toast from "react-hot-toast";
import { PublicApi } from "../api";

const registerService = async (registerData: any) => {
  try {
    const response = await PublicApi.post("/auth/register", {
      username: registerData.username,
      email: registerData.email,
      password: registerData.password,
    });
    if (response.data) {
      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("auth-token", response.data.token);
      toast.success("Registro realizdo com sucesso!");
    }
  } catch (error: any) {
    if (error.response.status === 500) toast.error("Erro do servidor");
    else toast.error("Não foi possível realizar seu regsitro.");
  }
};

export default registerService;
