import React from 'react';
import { Shield, Zap, Eye, Ban, Lock, Cpu } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "Ad Blocking",
    description: "Blocks Google Ads, Facebook Ads, DoubleClick, Taboola, Outbrain, and more.",
  },
  {
    icon: Eye,
    title: "Tracker Prevention",
    description: "Stops tracking scripts and pixels from following you across the web.",
  },
  {
    icon: Ban,
    title: "Pop-up Blocker",
    description: "Eliminates intrusive pop-ups and redirect ads before they appear.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Uses declarativeNetRequest for native Chrome performance.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "No tracking, no analytics, no remote code. Your data stays yours.",
  },
  {
    icon: Cpu,
    title: "Low Resources",
    description: "Optimized for minimal memory usage. Won't slow down your browser.",
  },
];

const Features: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient">Powerful</span> Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to browse the web without distractions
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group glass-card rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 opacity-0 animate-fade-in"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
