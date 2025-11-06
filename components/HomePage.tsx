import React from 'react';
import { ArtItem, Page } from '../types';
import StatsSection from './StatsSection';
import Testimonials from './Testimonials';
import FeaturedArtworks from './FeaturedArtworks';

interface HomePageProps {
  onViewArt: (id: number) => void;
  onAddToCart: (item: ArtItem) => void;
  onNavigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onViewArt, onAddToCart, onNavigate }) => {
  return (
    <div className="space-y-16">
      <StatsSection />
      <Testimonials />
      <FeaturedArtworks 
        onViewArt={onViewArt} 
        onAddToCart={onAddToCart} 
        onNavigate={onNavigate} 
      />
    </div>
  );
};

export default HomePage;