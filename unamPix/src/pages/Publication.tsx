import { FooterForm } from "@/components/forms/FooterForm";
import { HeaderForm } from "@/components/forms/HeaderForm";
import { PublicationForm } from "@/components/forms/PublicationForm";

export const Publication = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <HeaderForm />
        <PublicationForm />
        <FooterForm />
    </div>
  )
};
