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
import { WhyDelta } from "./sections/WhyDelta";
import { ProjectGallery } from "./sections/ProjectGallery";
import { PhotoCta } from "./sections/PhotoCta";

function App() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Services />
        <WhyDelta />
        <ProjectGallery />
        <Warranty />
        <Configurator />
        <Process />
        <PhotoCta />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
