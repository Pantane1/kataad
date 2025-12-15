import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
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
            <Link 
              to="/contact" 
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:border-primary/40 hover:text-primary transition-all group"
            >
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Get in Touch</span>
            </Link>
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
