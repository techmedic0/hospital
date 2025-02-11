import React from 'react';
import ServicesGrid from '../components/ServicesGrid';

const Services: React.FC = () => {
  return (
    <div className="pt-16">
      <div className="bg-primary-teal text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl opacity-90">Comprehensive healthcare solutions tailored to your needs</p>
        </div>
      </div>
      <ServicesGrid />
    </div>
  );
};

export default Services