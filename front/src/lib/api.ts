import axios from "axios";
import { getToken } from "./services/auth.service";

const requestHandler = (config: any) => {
  let token = getToken();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
};
const PrivateApi = axios.create({ baseURL: import.meta.env.VITE_API_URL });

PrivateApi.interceptors.request.use(requestHandler);

const PublicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export { PrivateApi, PublicApi };
