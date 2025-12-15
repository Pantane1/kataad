import React from 'react';
import { Button } from '@/components/ui/button';
import ShieldIcon from './ShieldIcon';
import { Download, Github } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      {/* Floating accent shapes */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left space-y-8 opacity-0 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Chrome Extension • Manifest V3
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-gradient">KataAd</span>
              <br />
              <span className="text-foreground">Ad Blocker</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl">
              Block noise. Keep control.
              <br />
              <span className="text-foreground/80">Fast, lightweight, and privacy-first.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" className="group">
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Download Extension
              </Button>
              <Button variant="glass" size="xl">
                <Github className="w-5 h-5" />
                View Source
              </Button>
            </div>
            
            <div className="flex items-center gap-8 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold text-lg">0</span>
                <span>Trackers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold text-lg">0</span>
                <span>Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold text-lg">∞</span>
                <span>Privacy</span>
              </div>
            </div>
          </div>
          
          {/* Shield icon */}
          <div className="flex-1 flex justify-center opacity-0 animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <ShieldIcon className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96" animated />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
        <span className="text-sm">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-3 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
