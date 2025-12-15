import React from 'react';
import { Check, ChevronRight } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Download Extension",
    description: "Download the KataAd extension files from this page or clone from GitHub.",
    code: null,
  },
  {
    number: "02",
    title: "Open Chrome Extensions",
    description: "Navigate to chrome://extensions in your browser's address bar.",
    code: "chrome://extensions",
  },
  {
    number: "03",
    title: "Enable Developer Mode",
    description: "Toggle the 'Developer mode' switch in the top right corner.",
    code: null,
  },
  {
    number: "04",
    title: "Load Extension",
    description: "Click 'Load unpacked' and select the kataad folder.",
    code: null,
  },
];

const Installation: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container relative z-10 px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Easy <span className="text-gradient">Installation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get up and running in less than a minute
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="group glass-card rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 opacity-0 animate-slide-in-left"
              style={{ animationDelay: `${0.15 * index}s` }}
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{step.number}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                    <ChevronRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-muted-foreground mb-3">{step.description}</p>
                  
                  {step.code && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary font-mono text-sm text-primary">
                      <code>{step.code}</code>
                    </div>
                  )}
                </div>
                
                <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-muted flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all">
                  <Check className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Testing info */}
        <div className="mt-16 max-w-3xl mx-auto glass-card rounded-2xl p-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <h3 className="text-xl font-bold text-foreground mb-4">Testing Your Installation</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Visit any website with ads (news sites work well)</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Click the KataAd icon to see blocked request count</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Toggle the extension on/off to compare</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Installation;
