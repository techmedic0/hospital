import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, MessageSquare } from 'lucide-react';

const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-background-light dark:bg-background-dark rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Book an Appointment</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-text-body dark:text-text-light mb-2">
              <User className="w-4 h-4 mr-2" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label className="flex items-center text-text-body dark:text-text-light mb-2">
              <Phone className="w-4 h-4 mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>

        <div>
          <label className="flex items-center text-text-body dark:text-text-light mb-2">
            <Calendar className="w-4 h-4 mr-2" />
            Preferred Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="flex items-center text-text-body dark:text-text-light mb-2">
            <Clock className="w-4 h-4 mr-2" />
            Preferred Time
          </label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="flex items-center text-text-body dark:text-text-light mb-2">
            <MessageSquare className="w-4 h-4 mr-2" />
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="input-field"
          ></textarea>
        </div>

        <button type="submit" className="btn-primary w-full">
          Schedule Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;