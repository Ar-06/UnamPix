import { FooterForm } from "@/components/forms/FooterForm";
import { HeaderForm } from "../components/forms/HeaderForm";
import { RegisterForm } from "../components/forms/RegisterForm";

export const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <HeaderForm />
      <RegisterForm />
      <FooterForm />
    </div>
  );
};
