import { toast } from "@pheralb/toast";
import { Loader2, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";
import type { User } from "../../types/user";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const RegisterForm = () => {
  const { register, errors, loading, clearErrors } = useAuth();

  const [form, setForm] = useState<User>({
    idUsuario: "",
    nombres: "",
    apellidos: "",
    contraseña: "",
  });

  useEffect(() => {
    if (errors.length) {
      errors.forEach((err) => toast.error({ text: err }));
    }
  }, [errors]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((s) => ({ ...s, [id]: value }));
    if (errors.length) clearErrors();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.idUsuario ||
      !form.nombres ||
      !form.apellidos ||
      !form.contraseña
    ) {
      toast.error({ text: "Faltan campos" });
      return;
    }

    await register(form);
  };

  return (
    <div className="flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Únete a UnamPix</CardTitle>
          <CardDescription>
            Crea tu cuenta y forma parte de la comunidad fotográfica
            universitaria
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombres">Nombres</Label>
                <Input
                  type="text"
                  id="nombres"
                  value={form.nombres ?? ""}
                  onChange={handleChange}
                  name="nombres"
                  placeholder="Jhon Tomas"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellidos">Apellidos</Label>
                <Input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  value={form.apellidos ?? ""}
                  onChange={handleChange}
                  placeholder="Smith Doe"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="idUsuario">Código de Estudiante</Label>
              <Input
                id="idUsuario"
                type="text"
                value={form.idUsuario ?? ""}
                onChange={handleChange}
                placeholder="2023001234"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contraseña">Contraseña</Label>
              <Input
                type="password"
                id="contraseña"
                name="contraseña"
                value={form.contraseña ?? ""}
                onChange={handleChange}
                placeholder="********"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Confirmar Contraseña</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="********"
                required
              />
            </div>

            {errors?.length > 0 && (
              <div className="text-sm text-red-600 space-y-1">
                {errors.map((err, i) => (
                  <p key={i}>{err}</p>
                ))}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  Cargando...
                </>
              ) : (
                "Crear Cuenta"
              )}
            </Button>
          </form>
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Iniciar Sesión
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
