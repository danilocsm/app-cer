import { createRoot } from "react-dom/client";
import App from "./App";
import "./global.css";
import logoutService from "./lib/services/logout.service";

window.onunload = async () => {
  await logoutService();
  sessionStorage.clear();
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
