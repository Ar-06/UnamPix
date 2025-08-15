import { HeaderGallery } from "@/components/gallery/HeaderGallery";
import { ImagesGrid } from "@/components/gallery/ImagesGrid";
import { usePublication } from "@/context/publics/usePublicacion";

export const Galería = () => {
  const { filterPublications } = usePublication();

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      <HeaderGallery />
      <div className="flex-1 overflow-y-auto">
        <ImagesGrid images={filterPublications} />
      </div>
    </section>
  );
};
