import { useEffect } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router';
import { useLenis, getLenis } from './hooks/useLenis';
import Navigation from './sections/Navigation';
import Footer from './components/site/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ExpertisePage from './pages/ExpertisePage';
import PartnersPage from './pages/PartnersPage';
import ContactPage from './pages/ContactPage';

/** Scrolls to top (or a requested anchor) on every route change. */
function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const anchor = (location.state as { anchor?: string } | null)?.anchor;
    const lenis = getLenis();

    if (anchor) {
      // let the new page paint first
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(anchor);
          if (el) {
            if (lenis) lenis.scrollTo(el, { offset: -90, duration: 1.4 });
            else el.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    } else {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.state]);

  return null;
}

function AppShell() {
  useLenis();
  const location = useLocation();

  return (
    <div className="relative">
      <Navigation />
      <ScrollManager />
      <main key={location.pathname} className="page-enter">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/expertise" element={<ExpertisePage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}
