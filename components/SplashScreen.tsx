import React, { useState, useEffect } from 'react';
import RippleButton from './RippleButton';

interface SplashScreenProps {
  onNavigate: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onNavigate }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Delay to allow for smooth transition/animation
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-primary">
      <video
        className="absolute top-1/2 left-1/2 w-full h-full object-cover z-0 transform -translate-x-1/2 -translate-y-1/2"
        src="/homepage.mp4"
        autoPlay
        loop
        muted
        playsInline 
        poster="https://images.unsplash.com/photo-1488330890402-42f3a4d075f5?w=1920&q=80&auto=format&fit=crop"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <div className={`transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Artfolio
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200">
            Discover and collect extraordinary digital art.
          </p>
          <RippleButton
            onClick={onNavigate}
            className="mt-8 bg-accent text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-accent transition-transform transform hover:scale-105"
          >
            Explore the Collection
          </RippleButton>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;