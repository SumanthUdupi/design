import Hero from '../components/Hero';
import About from '../components/About';
import ProjectsGrid from '../components/ProjectsGrid';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="left">
          <Hero />
        </div>
        <div className="right" aria-hidden>
          {/* Placeholder illustrated element */}
          <div
            style={{
              width: '100%',
              height: 300,
              borderRadius: 24,
              background: 'linear-gradient(135deg, rgba(198,123,92,0.12), rgba(139,157,131,0.08))',
            }}
          />
        </div>
      </section>

      <section className="about">
        <div className="container">
          <About />
        </div>
      </section>

      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <ProjectsGrid />
      </div>
    </>
  );
}
