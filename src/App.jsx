import { useState } from 'react';
import { useReveal } from './hooks/useReveal.js';
import { useGsapEnhancements } from './hooks/useGsapEnhancements.js';
import CustomCursor from './components/CustomCursor.jsx';
import Preloader from './components/Preloader.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Testimonials from './components/Testimonials.jsx';
import Pitch from './components/Pitch.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useReveal();
  useGsapEnhancements({ enabled: loaded });

  return (
    <>
      <Preloader onDone={() => setLoaded(true)} />
      <CustomCursor />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Testimonials />
      <Pitch />
      <Contact />
      <Footer />
    </>
  );
}
