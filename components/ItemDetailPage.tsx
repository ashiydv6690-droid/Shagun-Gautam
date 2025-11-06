import React from 'react';
import { ArtItem } from '../types';
import RippleButton from './RippleButton';

interface ItemDetailPageProps {
  item: ArtItem;
  onAddToCart: (item: ArtItem) => void;
  onBack: () => void;
}

const ItemDetailPage: React.FC<ItemDetailPageProps> = ({ item, onAddToCart, onBack }) => {
  return (
    <div className="max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <RippleButton onClick={onBack} className="flex items-center text-gray-600 hover:text-accent mb-6 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back to Gallery
      </RippleButton>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <img src={item.imageUrl} alt={item.title} className="w-full h-auto object-cover rounded-lg shadow-md" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">{item.title}</h1>
          <p className="text-xl text-gray-600 mt-2">by {item.artist}, {item.year}</p>
          <p className="text-3xl font-bold text-gray-900 my-6">${item.price}</p>
          <p className="text-gray-700 leading-relaxed">{item.description}</p>
          <RippleButton
            onClick={() => onAddToCart(item)}
            className="mt-8 w-full bg-accent text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-transform transform hover:scale-105"
          >
            Add to Cart
          </RippleButton>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;