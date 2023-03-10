import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  AgentBio,
  ActivitiesDashboard,
  DoubtsDashboard,
  ItemsDashboard,
  OptionsLayout,
} from "../../components/admin-components/";
import { ActivityForm, ItemForm, EditAgentForm } from "../../components/forms/";
import LogoutButton from "../../components/LogoutButton";
import { PrivateApi } from "../../lib/api";
import { getUser, isAuthenticated } from "../../lib/services/auth.service";

function HealthAgentPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>({});
  const [optionSelected, setOptionSelected] = useState<number>(0);

  const fecthUserData = async () => {
    try {
      const response = await PrivateApi.get("/users/" + getUser());
      if (response.data) setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated()) fecthUserData();
  }, []);

  useEffect(() => {
    const sessionTimeout = setTimeout(() => {
      sessionStorage.clear();
      navigate("/", { replace: true });
      toast.error("Sessão expirada");
    }, 1000 * 60 * 60);
  }, []);

  return (
    <div className="w-screen flex flex-col items-center justify-center p-4">
      <div className="flex flex-row relative w-screen justify-center">
        <h1 className="text-[34px] text-center">PÁGINA DO AGENTE DE SAÚDE</h1>
        <LogoutButton />
      </div>
      <AgentBio
        username={userData.username || ""}
        email={userData.email || ""}
        picture={userData.picture || ""}
      />
      <OptionsLayout
        onSelected={(selected: number) => {
          setOptionSelected(selected);
        }}
      />
      <div className="mt-4 w-screen h-auto flex items-center justify-center py-4">
        {(optionSelected === 0 && <DoubtsDashboard />) ||
          (optionSelected === 1 && <ActivityForm />) ||
          (optionSelected === 2 && <ItemForm />) ||
          (optionSelected === 3 && <ActivitiesDashboard />) ||
          (optionSelected === 4 && <ItemsDashboard />) ||
          (optionSelected === 5 && (
            <EditAgentForm
              userId={userData.id}
              name={userData.username}
              email={userData.email}
            />
          ))}
      </div>
    </div>
  );
}

export default HealthAgentPage;
