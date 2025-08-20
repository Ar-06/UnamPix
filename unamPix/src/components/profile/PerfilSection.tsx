import { useAuth } from "@/context/auth/useAuth";
import { useEffect, useState } from "react";

export const PerfilSection = () => {
  const { initialUsers, user, loading } = useAuth();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    if (!loading && user) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 400);

      return () => clearTimeout(timer);
    } else {
      setShowSkeleton(true);
    }
  }, [loading, user]);

  if (showSkeleton) {
    return (
      <section className="flex animate-pulse flex-col items-center justify-center py-16">
        <div className="h-32 w-32 rounded-full bg-gray-200"></div>
        <div className="mt-4 h-8 w-48 rounded bg-gray-200"></div>
        <div className="mt-2 h-6 w-32 rounded bg-gray-200"></div>
      </section>
    );
  }

  return (
    <header className="flex flex-col justify-center items-center bg-white py-12 md:py-4 border-b backdrop-blur-sm">
      <div className="flex flex-col items-center text-center">
        <div className="relative h-24 w-24 rounded-full border-b bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-4xl text-white">
          {initialUsers()}
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-gray-800">
          {user?.nombres}
        </h1>
        <p className="mt-1 text-sm text-gray-500">{user?.idUsuario}</p>
      </div>
    </header>
  );
};
