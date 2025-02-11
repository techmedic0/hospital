import React from 'react';
import BlogSection from '../components/blog/BlogSection';

const Blog: React.FC = () => {
  return (
    <div className="pt-16">
      <div className="bg-primary-teal text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Health Blog</h1>
          <p className="text-xl opacity-90">Stay informed with the latest health news and medical insights</p>
        </div>
      </div>
      <BlogSection />
    </div>
  );
};

export default Blog