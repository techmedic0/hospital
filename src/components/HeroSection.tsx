import React from 'react';
import { Calendar } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2070"
          alt="Modern hospital building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-teal/90 to-primary-blue/70" />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Health, Our Priority
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-background-light">
            Experience world-class healthcare with cutting-edge technology and compassionate care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-accent flex items-center justify-center">
              <Calendar className="w-5 h-5 mr-2" />
              Book Appointment
            </button>
            <button className="bg-background-light hover:bg-accent-cyan text-primary-teal hover:text-white 
                             font-semibold py-3 px-8 rounded-lg transition-all duration-300 
                             hover:shadow-glow transform hover:scale-[1.02]">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;