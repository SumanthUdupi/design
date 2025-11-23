'use client';
import Hero from '../components/Hero';
import About from '../components/About';
import ProjectsGrid from '../components/ProjectsGrid';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import EasterEggs from '../components/EasterEggs';
import BackgroundDecorations from '../components/BackgroundDecorations';
import HeroImage from '../components/HeroImage';

export default function Home() {
  return (
    <>
      <EasterEggs />

      <section className="hero">
        <div className="left">
          <Hero />
        </div>
        <div className="right" aria-hidden>
          <HeroImage />
        </div>
      </section>

      <section className="about">
        <div className="container">
          <About />
        </div>
      </section>

      <Skills />

      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <ProjectsGrid />
      </div>

      <Contact />

      <BackgroundDecorations />
    </>
  );
}
