import React from 'react';
import ShieldIcon from './ShieldIcon';

const Footer: React.FC = () => {
  return (
    <footer className="relative py-16 border-t border-border">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <ShieldIcon className="w-12 h-12" />
            <div>
              <h3 className="text-xl font-bold text-gradient">KataAd</h3>
              <p className="text-sm text-muted-foreground">Block noise. Keep control.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#installation" className="hover:text-primary transition-colors">Installation</a>
            <a href="#source" className="hover:text-primary transition-colors">Source Code</a>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              Built by <span className="text-primary font-semibold">Pantane</span>
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Chrome MV3 Compliant • Open Source
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground/50">
            © 2024 KataAd. No tracking. No analytics. Just privacy.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
