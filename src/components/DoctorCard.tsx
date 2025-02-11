import React from 'react';
import { Calendar } from 'lucide-react';

interface DoctorProps {
  name: string;
  specialty: string;
  image: string;
  availability: string;
}

const DoctorCard: React.FC<DoctorProps> = ({ name, specialty, image, availability }) => {
  return (
    <div className="bg-background-light dark:bg-background-dark rounded-xl shadow-lg overflow-hidden 
                    transition-all duration-300 transform hover:scale-[1.02] hover:shadow-glow">
      <div className="relative h-64">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-primary-blue dark:text-accent-cyan mb-4">{specialty}</p>
        <div className="flex items-center text-text-body dark:text-text-light">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{availability}</span>
        </div>
        <button className="btn-secondary mt-6 w-full">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;