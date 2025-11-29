import { Routes, Route } from "react-router-dom";
import AnimWrapper from "./components/AnimWrapper";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Blog from "./pages/Blog";
import Innovation from "./pages/Innovation";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* background glow */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-sky-500/10 via-fuchsia-500/5 to-emerald-500/10 blur-3xl opacity-70" />

      <div className="relative min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          <AnimWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/innovation" element={<Innovation />} />
              <Route path="/contact" element={<Contact />} />
              {/* 404 catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimWrapper>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
