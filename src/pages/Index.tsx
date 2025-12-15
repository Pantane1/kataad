import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import PopupDemo from '@/components/PopupDemo';
import Installation from '@/components/Installation';
import ExtensionFiles from '@/components/ExtensionFiles';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>KataAd – Lightweight Ad Blocker Extension by Pantane</title>
        <meta name="description" content="Block noise. Keep control. KataAd is a fast, lightweight Chrome ad blocker built by Pantane. No tracking, no analytics, just privacy." />
        <meta name="keywords" content="ad blocker, chrome extension, privacy, KataAd, Pantane, block ads, tracker blocker" />
        <link rel="canonical" href="https://kataad.pantane.com" />
      </Helmet>
      
      <main className="min-h-screen">
        <Hero />
        <section id="features">
          <Features />
        </section>
        <section id="demo">
          <PopupDemo />
        </section>
        <section id="installation">
          <Installation />
        </section>
        <section id="source">
          <ExtensionFiles />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Index;
