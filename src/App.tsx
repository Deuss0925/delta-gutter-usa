import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";
import { Hero } from "./sections/Hero";
import { TrustStrip } from "./sections/TrustStrip";
import { Services } from "./sections/Services";
import { Configurator } from "./sections/Configurator";
import { Warranty } from "./sections/Warranty";
import { Process } from "./sections/Process";
import { Faq } from "./sections/Faq";
import { Contact } from "./sections/Contact";

function App() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Services />
        <Configurator />
        <Warranty />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
