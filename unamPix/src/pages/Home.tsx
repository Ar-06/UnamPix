import { Header } from "../components/hero/Header";
import { HeroSection } from "../components/hero/HeroSection";
import { QuickFeatures } from "../components/hero/QuickFeatures";

export const Home = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from blue-50 via-white to-indigo-50">
      <Header />
      <HeroSection />
      <QuickFeatures />
    </main>
  );
};
