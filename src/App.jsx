import { useReveal } from './hooks/useReveal.js';
import CustomCursor from './components/CustomCursor.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Pitch from './components/Pitch.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  useReveal();

  return (
    <>
      <CustomCursor />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Pitch />
      <Contact />
      <Footer />
    </>
  );
}
