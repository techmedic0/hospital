import React from 'react';
import { services } from '../data/services.json';
import * as Icons from 'lucide-react';

const ServicesGrid: React.FC = () => {
  return (
    <section className="py-20 section-mint">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg">Comprehensive healthcare solutions for you and your family</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = Icons[service.icon as keyof typeof Icons];
            
            return (
              <div
                key={service.id}
                className="bg-background-light dark:bg-background-dark p-8 rounded-xl shadow-lg 
                         hover:shadow-glow transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="w-12 h-12 bg-primary-teal/10 dark:bg-primary-teal/20 rounded-lg 
                              flex items-center justify-center mb-6">
                  {IconComponent && (
                    <IconComponent className="w-6 h-6 text-primary-teal dark:text-accent-cyan" />
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-text-body dark:text-text-light">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;