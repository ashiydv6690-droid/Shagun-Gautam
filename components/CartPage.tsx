import React from 'react';
import { CartItem, Page } from '../types';
import RippleButton from './RippleButton';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  onNavigate: (page: Page) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cart, onUpdateQuantity, onRemove, onNavigate }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added any art to your cart yet.</p>
        <RippleButton
          onClick={() => onNavigate('gallery')}
          className="bg-accent text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Continue Shopping
        </RippleButton>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-lg">
        <ul className="divide-y divide-gray-200">
          {cart.map(item => (
            <li key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
                <img src={item.imageUrl} alt={item.title} className="w-24 h-24 object-cover rounded-md mr-6" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
                  <p className="text-gray-600">{item.artist}</p>
                  <p className="text-lg font-bold text-gray-800 sm:hidden mt-2">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full sm:w-auto">
                <div className="flex items-center mr-6">
                  <RippleButton onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="text-gray-500 hover:text-gray-800 p-1 rounded-full border" rippleClassName="ripple-dark">-</RippleButton>
                  <span className="mx-4 font-medium">{item.quantity}</span>
                  <RippleButton onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="text-gray-500 hover:text-gray-800 p-1 rounded-full border" rippleClassName="ripple-dark">+</RippleButton>
                </div>
                <p className="text-lg font-bold text-gray-800 hidden sm:block w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                <RippleButton onClick={() => onRemove(item.id)} className="ml-6 text-gray-500 hover:text-red-600" rippleClassName="ripple-dark">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </RippleButton>
              </div>
            </li>
          ))}
        </ul>
        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end items-center mb-4">
            <span className="text-xl font-medium text-gray-600">Subtotal:</span>
            <span className="text-2xl font-bold text-gray-900 ml-4">${subtotal.toFixed(2)}</span>
          </div>
          <p className="text-right text-gray-500 text-sm">Taxes and shipping calculated at checkout.</p>
          <div className="mt-6 flex justify-end space-x-4">
            <RippleButton onClick={() => onNavigate('gallery')} className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors" rippleClassName="ripple-dark">
              Continue Shopping
            </RippleButton>
            <RippleButton className="bg-accent text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              Checkout
            </RippleButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;