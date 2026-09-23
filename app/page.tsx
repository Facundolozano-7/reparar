import Topbar from "@/components/Topbar";
import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import Trabajos from "@/components/Trabajos";
import PasoAPaso from "@/components/PasoAPaso";
import DondeEstamos from "@/components/DondeEstamos";
import AnimacionesScroll from "@/components/AnimacionesScroll";
import FondoMecanico from "@/components/FondoMecanico";

export default function Home() {
  return (
    <>
      <Topbar />
      <main id="top">
        <Hero />
        <Servicios />
        <Trabajos />
        <PasoAPaso />
        {/* Siempre última: cierra la página con contacto y ubicaciones */}
        <DondeEstamos />
      </main>
      <AnimacionesScroll />
      <FondoMecanico />
    </>
  );
}
