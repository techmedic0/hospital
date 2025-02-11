import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  department: string;
  doctor: string;
  date: string;
  helpful: number;
  notHelpful: number;
}

const dummyReviews: Review[] = [
  {
    id: 1,
    name: 'John Doe',
    rating: 5,
    comment: 'Excellent care and attention from the staff. Dr. Johnson was very thorough and professional.',
    department: 'Cardiology',
    doctor: 'Dr. Sarah Johnson',
    date: '2024-02-15',
    helpful: 12,
    notHelpful: 1,
  },
  {
    id: 2,
    name: 'Jane Smith',
    rating: 4,
    comment: 'Great experience overall. The facilities are modern and clean.',
    department: 'Pediatrics',
    doctor: 'Dr. Emily Williams',
    date: '2024-02-14',
    helpful: 8,
    notHelpful: 2,
  },
  // Add more dummy reviews as needed
];

const ReviewsSection: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [reviews, setReviews] = useState(dummyReviews);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 0,
    comment: '',
    department: '',
    doctor: '',
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Add validation and submission logic here
    const review: Review = {
      id: reviews.length + 1,
      ...newReview,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      notHelpful: 0,
    };
    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 0, comment: '', department: '', doctor: '' });
  };

  const handleHelpful = (id: number, isHelpful: boolean) => {
    setReviews(
      reviews.map((review) =>
        review.id === id
          ? {
              ...review,
              helpful: isHelpful ? review.helpful + 1 : review.helpful,
              notHelpful: !isHelpful ? review.notHelpful + 1 : review.notHelpful,
            }
          : review
      )
    );
  };

  const StarRating: React.FC<{ rating: number; onRate?: (rating: number) => void }> = ({
    rating,
    onRate,
  }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate?.(star)}
          className={`transition-colors duration-300 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          <Star className="w-5 h-5 fill-current" />
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Patient Reviews</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              filter === 'all'
                ? 'bg-primary-teal text-white'
                : 'bg-background-mint hover:bg-primary-teal/20'
            }`}
          >
            All Reviews
          </button>
          <button
            onClick={() => setFilter('cardiology')}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              filter === 'cardiology'
                ? 'bg-primary-teal text-white'
                : 'bg-background-mint hover:bg-primary-teal/20'
            }`}
          >
            Cardiology
          </button>
          <button
            onClick={() => setFilter('pediatrics')}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              filter === 'pediatrics'
                ? 'bg-primary-teal text-white'
                : 'bg-background-mint hover:bg-primary-teal/20'
            }`}
          >
            Pediatrics
          </button>
        </div>
      </div>

      <div className="mb-12">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="review-swiper"
        >
          {reviews
            .filter(
              (review) => filter === 'all' || review.department.toLowerCase() === filter.toLowerCase()
            )
            .map((review) => (
              <SwiperSlide key={review.id}>
                <div className="bg-white dark:bg-background-dark p-6 rounded-xl shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{review.name}</h3>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="mb-4">{review.comment}</p>
                  <div className="flex justify-between items-center text-sm">
                    <div className="text-gray-500">
                      {review.department} - {review.doctor}
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleHelpful(review.id, true)}
                        className="flex items-center gap-1 text-gray-500 hover:text-primary-teal transition-colors duration-300"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        {review.helpful}
                      </button>
                      <button
                        onClick={() => handleHelpful(review.id, false)}
                        className="flex items-center gap-1 text-gray-500 hover:text-primary-teal transition-colors duration-300"
                      >
                        <ThumbsDown className="w-4 h-4" />
                        {review.notHelpful}
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Your Name</label>
            <input
              type="text"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <StarRating
              rating={newReview.rating}
              onRate={(rating) => setNewReview({ ...newReview, rating })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Department</label>
            <select
              value={newReview.department}
              onChange={(e) => setNewReview({ ...newReview, department: e.target.value })}
              className="input-field"
              required
            >
              <option value="">Select Department</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Neurology">Neurology</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Doctor</label>
            <select
              value={newReview.doctor}
              onChange={(e) => setNewReview({ ...newReview, doctor: e.target.value })}
              className="input-field"
              required
            >
              <option value="">Select Doctor</option>
              <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
              <option value="Dr. Emily Williams">Dr. Emily Williams</option>
              <option value="Dr. Michael Chen">Dr. Michael Chen</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Your Review</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="input-field min-h-[100px]"
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewsSection;