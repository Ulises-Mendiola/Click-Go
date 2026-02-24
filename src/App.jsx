import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CRMProvider } from './context/CRMContext';
import './index.css';

import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import ProblemSolution from './components/ProblemSolution/ProblemSolution';
import SocialProof from './components/SocialProof/SocialProof';
import Services from './components/Services/Services';
import Methodology from './components/Methodology/Methodology';
import Projects from './components/Projects/Projects';
import Confidence from './components/Confidence/Confidence';
import ContactForm from './components/ContactForm/ContactForm';
import Footer from './components/Footer/Footer';

import LoginPage from './pages/LoginPage/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';

const LandingPage = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <ProblemSolution />
      <Services />
      <Methodology />
      <Projects />
      <Confidence />
      <SocialProof />
      <ContactForm />
    </main>
    <Footer />
  </>
);

import { Toaster } from 'sileo';

function App() {
  return (
    <CRMProvider>
      <Toaster position="top-center" theme="dark" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </CRMProvider>
  );
}

export default App;
