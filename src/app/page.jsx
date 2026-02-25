"use client";
import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import ProblemSolution from '../components/ProblemSolution/ProblemSolution';
import SocialProof from '../components/SocialProof/SocialProof';
import Services from '../components/Services/Services';
import Methodology from '../components/Methodology/Methodology';
import Projects from '../components/Projects/Projects';
import Confidence from '../components/Confidence/Confidence';
import ContactForm from '../components/ContactForm/ContactForm';
import Footer from '../components/Footer/Footer';

export default function Home() {
    return (
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
}
