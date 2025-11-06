import React from 'react';
import { ArtItem, Page } from '../types';
import { ART_PIECES } from '../constants';
import ArtCard from './ArtCard';
import RippleButton from './RippleButton';

interface FeaturedArtworksProps {
    onViewArt: (id: number) => void;
    onAddToCart: (item: ArtItem) => void;
    onNavigate: (page: Page) => void;
}

const FeaturedArtworks: React.FC<FeaturedArtworksProps> = ({ onViewArt, onAddToCart, onNavigate }) => {
  // Get the first 4 artworks for the featured section
  const featuredPieces = ART_PIECES.slice(0, 4);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Collection</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">A glimpse into our curated world of digital art.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredPieces.map(art => (
            <ArtCard key={art.id} item={art} onViewArt={onViewArt} onAddToCart={onAddToCart} />
          ))}
        </div>
        <div className="mt-12 text-center">
            <RippleButton 
                onClick={() => onNavigate('gallery')}
                className="bg-accent text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
                View Full Gallery
            </RippleButton>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArtworks;