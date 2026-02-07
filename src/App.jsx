import React from "react";
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
import AdminInnovation from "./pages/AdminInnovation";
import ProjectDetail from "./pages/ProjectDetail";
import Background from "./components/Background"; // New combined background
import CadUIController from "./components/CadUIController"; // CAD-Style UI

function App() {
  return (
    <div className="text-slate-100 min-h-screen relative font-sans">
      <CadUIController />
      {/* Visual Background */}
      <Background />

      <div className="relative min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          <AnimWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/education" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/innovation" element={<Innovation />} />
              <Route path="/admin/innovation" element={<AdminInnovation />} />
              <Route path="/contact" element={<Contact />} />
              {/* 404 catch-all */}
              <Route path="/projects/:id" element={<ProjectDetail />} />
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
