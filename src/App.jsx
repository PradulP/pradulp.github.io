import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AnimWrapper from "./components/AnimWrapper";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Background from "./components/Background"; // New combined background
import CadUIController from "./components/CadUIController"; // CAD-Style UI
import AutoCADCommandLine from "./components/AutoCADCommandLine";
import ScrollToTop from "./components/ScrollToTop";
import PageLoader from "./components/PageLoader";

// Lazy-loaded Pages (Code Splitting)
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Experience = lazy(() => import("./pages/Experience"));
const Projects = lazy(() => import("./pages/Projects"));
const Skills = lazy(() => import("./pages/Skills"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Innovation = lazy(() => import("./pages/Innovation"));
const InnovationDetail = lazy(() => import("./pages/InnovationDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminInnovation = lazy(() => import("./pages/AdminInnovation"));
const AdminPage = lazy(() => import("./pages/Admin"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

function App() {
  return (
    <div className="text-slate-100 min-h-screen relative font-sans">
      <ScrollToTop />
      <CadUIController />
      <AutoCADCommandLine />
      {/* Visual Background */}
      <Background />

      <div className="relative min-h-screen flex flex-col pb-24 md:pb-0">
        <Navbar />

        <main className="flex-1">
          <AnimWrapper>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/education" element={<Experience />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/innovation" element={<Innovation />} />
                <Route path="/innovation/:id" element={<InnovationDetail />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/innovation" element={<AdminInnovation />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                {/* 404 catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AnimWrapper>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
