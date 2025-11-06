import React from 'react';
import { ArtItem } from '../types';
import RippleButton from './RippleButton';

interface ArtCardProps {
  item: ArtItem;
  onViewArt: (id: number) => void;
  onAddToCart: (item: ArtItem) => void;
}

const ArtCard: React.FC<ArtCardProps> = ({ item, onViewArt, onAddToCart }) => {
  
  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    // Prevent ripple if the button was clicked
    if (target.closest('button')) {
      return;
    }
    
    const card = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(card.clientWidth, card.clientHeight);
    const radius = diameter / 2;
    
    const rect = card.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');
    
    const existingRipple = card.querySelector('.ripple');
    if (existingRipple) {
      existingRipple.remove();
    }
    
    card.appendChild(circle);

    setTimeout(() => {
        if(circle.parentElement) {
            circle.remove();
        }
    }, 600);

    onViewArt(item.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item);
  };

  return (
    <div 
      className="group bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-all duration-300 cursor-pointer ripple-container"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden">
        <img src={item.imageUrl} alt={item.title} className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-lg font-semibold text-white truncate">{item.title}</h3>
            <p className="text-gray-300 text-sm">{item.artist}</p>
        </div>
      </div>
      <div className="p-4 bg-white">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">${item.price}</p>
          <RippleButton
            onClick={handleAddToCart}
            className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors"
          >
            Add to Cart
          </RippleButton>
        </div>
      </div>
    </div>
  );
};

export default ArtCard;