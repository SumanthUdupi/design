import Hero from '../components/Hero';
import About from '../components/About';
import ProjectsGrid from '../components/ProjectsGrid';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="left">
          <Hero />
        </div>
        <div className="right" aria-hidden>
          {/* Illustrated element */}
           <svg width="100%" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-illustration">
                <style>{`
                    .float-1 { animation: float 6s ease-in-out infinite; }
                    .float-2 { animation: float 8s ease-in-out infinite reverse; }
                    .pulse { animation: pulse 4s ease-in-out infinite; }
                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-20px); }
                        100% { transform: translateY(0px); }
                    }
                    @keyframes pulse {
                        0% { transform: scale(1); opacity: 0.5; }
                        50% { transform: scale(1.05); opacity: 0.8; }
                        100% { transform: scale(1); opacity: 0.5; }
                    }
                `}</style>
                <circle cx="200" cy="200" r="150" fill="var(--soft-clay)" fillOpacity="0.3" className="pulse" />
                <path d="M100 200 C 100 100, 300 100, 300 200 S 100 300 100 200" stroke="var(--terracotta)" strokeWidth="2" fill="none" className="float-1" />
                <rect x="150" y="150" width="100" height="100" rx="20" stroke="var(--sage-green)" strokeWidth="2" fill="none" transform="rotate(15 200 200)" className="float-2" />
           </svg>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <About />
        </div>
      </section>

      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <ProjectsGrid />
      </div>

      <div className="container">
        <Skills />
      </div>

      <div className="container">
        <Contact />
      </div>
    </>
  );
}
