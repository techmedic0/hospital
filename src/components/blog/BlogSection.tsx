import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, Clock, Share2 } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const dummyArticles: Article[] = [
  {
    id: 1,
    title: 'Understanding Heart Health: A Comprehensive Guide',
    excerpt: 'Learn about the latest developments in cardiovascular health and prevention.',
    content: `
      Heart health is crucial for overall well-being. Regular exercise, a balanced diet, and stress management
      are key factors in maintaining a healthy heart. Recent studies have shown...
      
      [Content continues...]
    `,
    author: 'Dr. Sarah Johnson',
    date: '2024-02-15',
    readTime: '5 min read',
    category: 'Cardiology',
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=2070',
  },
  {
    id: 2,
    title: 'COVID-19: Latest Updates and Prevention Measures',
    excerpt: 'Stay informed about the current state of COVID-19 and best practices for prevention.',
    content: `
      As we continue to navigate the challenges of COVID-19, staying informed about the latest
      developments and prevention measures is crucial. Here's what you need to know...
      
      [Content continues...]
    `,
    author: 'Dr. Michael Chen',
    date: '2024-02-14',
    readTime: '4 min read',
    category: 'Infectious Diseases',
    image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&q=80&w=2070',
  },
  {
    id: 3,
    title: 'Mental Health in the Modern Age',
    excerpt: 'Exploring the importance of mental health and strategies for maintaining emotional well-being.',
    content: `
      Mental health is just as important as physical health. In today's fast-paced world,
      taking care of our mental well-being has become more crucial than ever...
      
      [Content continues...]
    `,
    author: 'Dr. Emily Williams',
    date: '2024-02-13',
    readTime: '6 min read',
    category: 'Mental Health',
    image: 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?auto=format&fit=crop&q=80&w=2070',
  },
];

const BlogSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [filter, setFilter] = useState('all');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const categories = ['all', 'cardiology', 'infectious diseases', 'mental health'];

  const filteredArticles = dummyArticles.filter(
    (article) => filter === 'all' || article.category.toLowerCase() === filter
  );

  const handleShare = (article: Article) => {
    if (navigator.share) {
      navigator
        .share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        })
        .catch((error) => console.log('Error sharing:', error));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {selectedArticle ? (
        <div className="relative">
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-primary-teal origin-left z-50"
            style={{ scaleX }}
          />
          
          <button
            onClick={() => setSelectedArticle(null)}
            className="mb-8 text-primary-teal hover:text-accent-cyan transition-colors duration-300"
          >
            ← Back to Articles
          </button>

          <article className="prose dark:prose-invert max-w-4xl mx-auto">
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full h-[400px] object-cover rounded-xl mb-8"
            />

            <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {selectedArticle.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {selectedArticle.readTime}
              </div>
              <button
                onClick={() => handleShare(selectedArticle)}
                className="flex items-center gap-2 hover:text-primary-teal transition-colors duration-300"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            <h1 className="text-4xl font-bold mb-4">{selectedArticle.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{selectedArticle.excerpt}</p>
            
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-background-mint text-primary-teal rounded-full text-sm">
                {selectedArticle.category}
              </span>
            </div>

            <div className="space-y-6">
              <p>{selectedArticle.content}</p>
              {/* Add more content sections as needed */}
            </div>

            <div className="mt-12 pt-8 border-t">
              <p className="text-sm text-gray-500">
                Written by <span className="font-medium text-gray-900 dark:text-white">{selectedArticle.author}</span>
              </p>
            </div>
          </article>
        </div>
      ) : (
        <>
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest Health News & Articles</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-300 whitespace-nowrap ${
                    filter === category
                      ? 'bg-primary-teal text-white'
                      : 'bg-background-mint hover:bg-primary-teal/20'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-background-dark rounded-xl shadow-lg overflow-hidden
                         hover:shadow-glow transition-all duration-300 transform hover:scale-[1.02]"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary-teal">{article.category}</span>
                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="text-primary-blue hover:text-accent-cyan transition-colors duration-300"
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogSection;