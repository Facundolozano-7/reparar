import Topbar from "@/components/Topbar";
import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";

export default function Home() {
  return (
    <>
      <Topbar />
      <main id="top">
        <Hero />
        <Servicios />
      </main>
    </>
  );
}
