import { HeaderForm } from "@/components/forms/HeaderForm";
import { ImagesGrid } from "@/components/gallery/ImagesGrid";
import { PerfilSection } from "@/components/profile/PerfilSection";
import { usePublication } from "@/context/publics/usePublicacion";

export const Profile = () => {
  const { publicationUser } = usePublication();

  return (
    <>
      <HeaderForm />
      <PerfilSection />
      <ImagesGrid images={publicationUser} isUserProfile={true} />
    </>
  );
};
