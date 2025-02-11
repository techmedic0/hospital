import React from 'react';
import ContactSection from '../components/ContactSection';

const Contact: React.FC = () => {
  return (
    <div className="pt-16">
      <div className="bg-primary-teal text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl opacity-90">Get in touch with our healthcare professionals</p>
        </div>
      </div>
      <ContactSection />
    </div>
  );
};

export default Contact