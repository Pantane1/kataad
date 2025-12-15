import React, { useState, useEffect } from 'react';

const PopupDemo: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const [blockedCount, setBlockedCount] = useState(0);

  // Simulate blocking animation
  useEffect(() => {
    if (enabled) {
      const interval = setInterval(() => {
        setBlockedCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [enabled]);

  return (
    <section className="py-24 relative">
      <div className="container px-4">
        <div className="text-center mb-16 opacity-0 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Try It Live</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Interactive preview of the extension popup — see how it looks and works
          </p>
        </div>

        <div className="flex justify-center opacity-0 animate-scale-in" style={{ animationDelay: '0.4s' }}>
          <div className="relative">
            {/* Browser frame mockup */}
            <div className="bg-card/30 backdrop-blur-xl rounded-2xl border border-border/50 p-4 shadow-2xl shadow-primary/10">
              {/* Browser chrome dots */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/30">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-4 text-xs text-muted-foreground font-mono">chrome-extension://kataad</span>
              </div>

              {/* Popup content */}
              <div 
                className="w-[280px] p-5 rounded-xl"
                style={{
                  background: 'linear-gradient(180deg, hsl(222 47% 8%) 0%, hsl(222 50% 4%) 100%)',
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(190 100% 45%))',
                      color: 'hsl(222 47% 8%)',
                    }}
                  >
                    K
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gradient">KataAd</div>
                    <div className="text-[11px] text-muted-foreground">Block noise. Keep control.</div>
                  </div>
                </div>

                {/* Status card */}
                <div className="glass-card rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] text-muted-foreground">Status</span>
                    <span className="text-sm font-semibold flex items-center gap-2">
                      <span 
                        className={`w-2 h-2 rounded-full transition-colors ${
                          enabled ? 'bg-green-500' : 'bg-destructive'
                        }`}
                      />
                      <span className={enabled ? 'text-foreground' : 'text-destructive'}>
                        {enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Stats card */}
                <div className="glass-card rounded-xl p-4 mb-4 text-center">
                  <div 
                    className="text-4xl font-bold text-primary transition-all"
                    style={{ 
                      textShadow: enabled ? '0 0 30px hsl(var(--primary) / 0.5)' : 'none'
                    }}
                  >
                    {blockedCount.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Ads Blocked This Session</div>
                </div>

                {/* Toggle button */}
                <button
                  onClick={() => setEnabled(!enabled)}
                  className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                    enabled
                      ? 'bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02]'
                      : 'bg-destructive/20 text-destructive border border-destructive/30 hover:bg-destructive/30'
                  }`}
                >
                  {enabled ? '🛡️ Protection Active' : '⚠️ Enable Protection'}
                </button>

                {/* Footer */}
                <div className="mt-4 text-center text-[11px] text-muted-foreground">
                  Built by <span className="text-primary">Pantane</span>
                </div>
              </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full -z-10" />
          </div>
        </div>

        {/* Click to try hint */}
        <p className="text-center text-muted-foreground text-sm mt-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          Click the button to toggle protection state
        </p>
      </div>
    </section>
  );
};

export default PopupDemo;
