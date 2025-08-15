import { Camera, Heart, Star, Upload, User, Users } from "lucide-react";
import { Link } from "react-router-dom";
import img1 from "../../assets/heroImages/1.jpg";
import img2 from "../../assets/heroImages/2.jpg";
import img3 from "../../assets/heroImages/3.jpg";
import img4 from "../../assets/heroImages/4.jpg";
import img5 from "../../assets/heroImages/5.jpg";
import { Carousel } from "./Carousel";

const features = [
  {
    icon: <Camera className="h-5 w-5 text-blue-600" />,
    bg: "bg-blue-50",
    text: "Explora miles de fotos",
  },
  {
    icon: <Users className="h-5 w-5 text-indigo-600" />,
    bg: "bg-indigo-50",
    text: "Conecta con estudiantes",
  },
  {
    icon: <Upload className="h-5 w-5 text-purple-600" />,
    bg: "bg-purple-50",
    text: "Sube tus mejores momentos",
  },
  {
    icon: <Heart className="h-5 w-5 text-pink-600" />,
    bg: "bg-pink-50",
    text: "Mejora tu perfil",
  },
];

const slides = [
  <img
    className="object-cover rounded-lg"
    src={img3}
    alt="image1"
    key="slide1"
  />,
  <img
    className="object-cover rounded-lg"
    src={img2}
    alt="image2"
    key="slide2"
  />,
  <img
    className="object-cover rounded-lg"
    src={img1}
    alt="image3"
    key="slide3"
  />,
  <img
    className="object-cover rounded-lg"
    src={img4}
    alt="image4"
    key="slide4"
  />,
  <img
    className="object-cover rounded-lg"
    src={img5}
    alt="image5"
    key="slide5"
  />,
];

export const HeroSection = () => (
  <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="container px-4 md:px-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px] items-center">
        <div className="flex flex-col justify-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium w-fit">
            <Star className="h-4 w-4 text-blue-600" />
            Galería Oficial UNAM
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl tracking-tighter sm:text-5xl md:text-6xl/none font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ¡Bienvenido a UnamPix!
            </h1>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Tu Galería Universitaria Digital
              </h2>
              <p className="text-lg text-gray-600">
                Universidad Nacional de Moquegua
              </p>
            </div>
            <p className="max-w-[600px] text-gray-600 md:text-xl leading-relaxed">
              Únete a nuestra comunidad visual donde puedes{" "}
              <span className="font-semibold text-blue-600">
                explorar momentos únicos,{" "}
              </span>
              <span className="font-semibold text-indigo-600">
                compartir tus mejores fotos
              </span>{" "}
              y{" "}
              <span className="font-semibold text-purple-600">
                conectar con compañeros a través de la fotografía universitaria
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-3 min-[400px]:flex-row">
            <Link
              to="/galeria"
              className="flex items-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              <Camera className="h-5 w-5 mr-2" />
              Comenzar a explorar
            </Link>
            <Link
              to="/register"
              className="flex items-center border-blue-200 border-2 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 bg-transparent"
            >
              <User className="h-5 w-5 mr-2" />
              ¿Quieres unirte?
            </Link>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">¿Qué puedes hacer aquí?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 ${feature.bg} p-4 rounded-lg`}
                >
                  {feature.icon}
                  <span className="text-sm font-medium text-gray-700">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex justify-end translate-x-55">
          <Carousel children={slides} />
        </div>
      </div>
    </div>
  </section>
);
