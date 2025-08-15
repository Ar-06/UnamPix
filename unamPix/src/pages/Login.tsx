import { FooterForm } from "../components/forms/FooterForm";
import { HeaderForm } from "../components/forms/HeaderForm";
import { LoginForm } from "../components/forms/LoginForm";

export const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <HeaderForm />
      <LoginForm />
      <FooterForm />
    </div>
  );
};
