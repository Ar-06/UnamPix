import { Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
const categories = ["Académico", "Eventos", "Deportes", "Cultural", "Social"];

export const PublicationForm = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectCategory, setSelectedCategory] = useState("Académico");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type == "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <section className="flex items-start px-6 py-8 justify-between">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
          Crear Publicación
        </h3>
        <div>
          <Button
            type="submit"
            form="publication-form"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 cursor-pointer"
          >
            <span className="font-bold">Crear</span>
          </Button>
        </div>
      </section>

      <form id="publication-form" className="px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div
              className={`relative border-2 h-full border-dashed rounded-2xl p-8 text-center transition-colors ${
                dragActive
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-300 bg-gray-100"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center pt-20 space-y-4">
                <div className="w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-700 font-medium mb-2">
                    Elige un archivo o arrástralo y colócalo aquí
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Recomendamos usar archivos .jpg .png .webp de alta calidad
                    con un tamaño inferior a 20 MB
                  </p>
                </div>
              </div>
              <Input
                type="file"
                name="image"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".jpg,.jpeg,.png,.webp"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-medium text-gray-600"
              >
                Título
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Agrega un título"
                className="border-gray-200 rounded-xl py-3 px-4 text-gray-700 placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-medium text-gray-600"
              >
                Descripción
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Agrega una descripción detallada"
                className="border-gray-200 rounded-xl py-3 px-4 text-gray-700 placeholder:text-gray-400 min-h-[120px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="category"
                className="text-sm font-medium text-gray-600"
              >
                Categoría
              </Label>
              <Select
                value={selectCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="border-gray-200 rounded-xl py-3 px-4 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="text-gray-700">
                  <SelectGroup>
                    {categories.map((cat) => (
                      <SelectItem
                        key={cat}
                        value={cat}
                        className="text-gray-700"
                      >
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="etiquetas"
                className="text-sm font-medium text-gray-600"
              >
                Etiquetas (máximo 3)
              </Label>
              <Input
                type="text"
                name="etiquetas"
                id="etiquetas"
                placeholder="Ej: #unam #universidad #carrera"
                className="border-gray-200 rounded-xl py-3 px-4 text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
