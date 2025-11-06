import React from 'react';
import { Page } from '../types';
import RippleButton from './RippleButton';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  cartItemCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentPage: Page;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, cartItemCount, searchQuery, onSearchChange, currentPage }) => {
  const galleryClasses = currentPage === 'gallery' 
    ? 'text-accent font-semibold' 
    : 'text-gray-600 hover:text-accent';

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <RippleButton
            onClick={() => onNavigate('home')}
            className="text-2xl font-bold text-gray-900 transition-colors hover:text-accent p-0 bg-transparent border-none text-left flex-shrink-0"
          >
            Artfolio
          </RippleButton>
          
          <div className="hidden sm:flex flex-grow items-center justify-center px-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search by title or artist..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-5 pr-10 py-2 text-sm text-gray-700 bg-gray-100/80 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-colors"
                aria-label="Search artworks"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <nav className="flex items-center space-x-2 md:space-x-4 ml-auto">
            <RippleButton
              onClick={() => onNavigate('gallery')}
              className={`${galleryClasses} transition-colors font-medium hidden md:block px-3 py-2 rounded-md`}
            >
              Gallery
            </RippleButton>
             <RippleButton
              className="text-gray-600 hover:text-accent transition-colors p-2"
              aria-label="Sign Up"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-4-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </RippleButton>
            <RippleButton
              className="text-gray-600 hover:text-accent transition-colors p-2"
              aria-label="Login"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </RippleButton>
            <RippleButton
              onClick={() => onNavigate('cart')}
              className="relative text-gray-600 hover:text-accent transition-colors p-2"
              aria-label={`View shopping cart with ${cartItemCount} items`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </RippleButton>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;