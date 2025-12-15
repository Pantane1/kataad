import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Github, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ShieldIcon from '@/components/ShieldIcon';

const Contact: React.FC = () => {
  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'pantane254@gmail.com',
      href: 'mailto:pantane254@gmail.com',
      color: 'from-red-500 to-orange-500',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@pantane1',
      href: 'https://github.com/pantane1',
      color: 'from-gray-400 to-gray-600',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+254 740 312 402',
      href: 'https://wa.me/254740312402',
      color: 'from-green-500 to-emerald-600',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Get in Touch – KataAd by Pantane</title>
        <meta name="description" content="Contact Pantane, the developer of KataAd ad blocker extension. Reach out via email, GitHub, or WhatsApp." />
      </Helmet>

      <main className="min-h-screen relative flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="container relative z-10 px-4 py-20">
          {/* Back button */}
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="max-w-2xl mx-auto text-center">
            {/* Header */}
            <div className="flex justify-center mb-8 opacity-0 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <ShieldIcon className="w-24 h-24" animated />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 opacity-0 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="text-gradient">Get in Touch</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-4 opacity-0 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
              Built by <span className="text-primary font-semibold">Pantane</span>
            </p>

            <p className="text-muted-foreground mb-12 opacity-0 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
              Have questions, feedback, or just want to say hi? <br />
              Reach out through any of these channels.
            </p>

            {/* Contact Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              {contactMethods.map((method, index) => (
                <a
                  key={method.label}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass-card rounded-2xl p-6 text-center hover:border-primary/40 transition-all duration-300 hover:scale-105 opacity-0 animate-slide-in-up"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div 
                    className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center group-hover:shadow-lg transition-shadow`}
                  >
                    <method.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{method.label}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    {method.value}
                  </p>
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 opacity-0 animate-fade-in" style={{ animationDelay: '0.9s' }}>
              <Link to="/">
                <Button variant="glass" size="lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to KataAd
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
