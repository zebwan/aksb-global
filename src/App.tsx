import { useLenis } from './hooks/useLenis';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Expertise from './sections/Expertise';
import WhyAksb from './sections/WhyAksb';
import Projects from './sections/Projects';
import Partners from './sections/Partners';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import ClosingCta from './sections/ClosingCta';
import FAQ from './components/site/FAQ';
import Footer from './components/site/Footer';

export default function App() {
  useLenis();

  return (
    <div className="relative">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Expertise />
        <WhyAksb />
        <Projects />
        <Partners />
        <Certifications />
        <Contact />
        <FAQ tone="stone" />
        <ClosingCta />
      </main>
      <Footer />
    </div>
  );
}
