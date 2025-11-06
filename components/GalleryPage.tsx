
import React from 'react';
import { ArtItem } from '../types';
import ArtCard from './ArtCard';
import Pagination from './Pagination';

interface GalleryPageProps {
  artPieces: ArtItem[];
  onViewArt: (id: number) => void;
  onAddToCart: (item: ArtItem) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ artPieces, onViewArt, onAddToCart, currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mt-8">
      {artPieces.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {artPieces.map(art => (
              <ArtCard key={art.id} item={art} onViewArt={onViewArt} onAddToCart={onAddToCart} />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-900">No Artworks Found</h2>
          <p className="text-gray-600 mt-2">Your search and filter combination did not match any artworks. Please try adjusting your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
