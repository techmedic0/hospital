import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-background-light dark:bg-background-dark shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-teal dark:text-accent-cyan">MedCare</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-text-body dark:text-text-light hover:text-primary-blue dark:hover:text-accent-cyan transition-colors duration-300">Home</Link>
            <Link to="/services" className="text-text-body dark:text-text-light hover:text-primary-blue dark:hover:text-accent-cyan transition-colors duration-300">Services</Link>
            <Link to="/doctors" className="text-text-body dark:text-text-light hover:text-primary-blue dark:hover:text-accent-cyan transition-colors duration-300">Doctors</Link>
            <Link to="/blog" className="text-text-body dark:text-text-light hover:text-primary-blue dark:hover:text-accent-cyan transition-colors duration-300">Blog</Link>
            <Link to="/contact" className="text-text-body dark:text-text-light hover:text-primary-blue dark:hover:text-accent-cyan transition-colors duration-300">Contact</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-background-mint dark:hover:bg-primary-teal/20 transition-colors duration-300"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-text-light" />
              ) : (
                <Moon className="w-5 h-5 text-text-heading" />
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-background-mint dark:hover:bg-primary-teal/20 transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-text-heading dark:text-text-light" />
              ) : (
                <Menu className="w-6 h-6 text-text-heading dark:text-text-light" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-primary-teal/20 dark:border-primary-teal/10">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-text-body dark:text-text-light hover:text-primary-blue dark:hover:text-accent-cyan transition-colors duration-300">Home</Link>
              <Link to="/services" className="text-text-body dark:text-text-light hover:text-primary-blue dark:hover:text-accent-cyan transition-colors duration-300">Services</Link>
              <Link to="/doctors" className="text-text-body dark:text-text-light hover:text-primary-blue dark:hover:text-accent-cyan transition-colors duration-300">Doctors</Link>
              <Link to="/blog" className="text-text-body dark:text-text-light hover:text-primary-blue dark:hover:text-accent-cyan transition-colors duration-300">Blog</Link>
              <Link to="/contact" className="text-text-body dark:text-text-light hover:text-primary-blue dark:hover:text-accent-cyan transition-colors duration-300">Contact</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;