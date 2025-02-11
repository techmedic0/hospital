import React from 'react';
import DoctorCard from '../components/DoctorCard';
import { doctors } from '../data/doctors.json';

const Doctors: React.FC = () => {
  return (
    <div className="pt-16">
      <div className="bg-primary-teal text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Doctors</h1>
          <p className="text-xl opacity-90">Meet our team of experienced healthcare professionals</p>
        </div>
      </div>
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                name={doctor.name}
                specialty={doctor.specialty}
                image={doctor.image}
                availability={doctor.availability}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Doctors