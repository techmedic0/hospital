import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesGrid from '../components/ServicesGrid';
import AppointmentForm from '../components/AppointmentForm';

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <ServicesGrid />
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Book an Appointment</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Schedule your visit with our healthcare professionals</p>
          </div>
          <AppointmentForm />
        </div>
      </section>
    </div>
  );
};

export default Home;