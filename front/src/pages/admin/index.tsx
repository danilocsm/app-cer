import { LoginForm } from "../../components/forms";
import { useForceUpdate } from "../../hooks/custom.hooks";
import { isAuthenticated } from "../../lib/services/auth.service";
import HealthAgentPage from "./HealthAgent";

function Admin() {
  const { forceUpdate } = useForceUpdate();

  if (!isAuthenticated())
    return (
      <div className="w-screen grid place-items-center mt-4">
        <LoginForm sideEffect={forceUpdate} />
      </div>
    );

  return <HealthAgentPage />;
}

export default Admin;
