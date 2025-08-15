import { Camera, Upload, Users } from "lucide-react";
import { Card } from "./Card";

export const QuickFeatures = () => {
  return (
    <section className="w-full py-12 bg-white/50 backdrop-blur-sm border-t">
      <section className="container px-4 md:px-6 mx-auto">
        <section className="flex flex-col gap-2 items-center justify-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Empieza tu experiencia UnamPix
          </h3>
          <p className="text-gray-600">
            Todo lo que necesitas para ser parte de nuestra comunidad visual
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center w-full mx-auto">
          <Card
            icon={<Camera className="h-8 w-8 text-blue-600" />}
            title="Comparte tus Momentos"
            description="Sube fotos de eventos, actividades académicas y momentos especiales de tu vida universitaria"
          />
          <Card
            icon={<Upload className="h-8 w-8 text-indigo-600" />}
            title="Comparte tus Momentos"
            description="Sube fotos de eventos, actividades académicas y momentos especiales de tu vida universitaria"
          />
          <Card
            icon={<Users className="h-8 w-8 text-purple-600" />}
            title="Conecta y colabora"
            description="Interactúa con otros estudiantes y construye recuerdos juntos"
          />
        </section>
      </section>
    </section>
  );
};
