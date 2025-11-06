import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ArtItem, CartItem, Page } from './types';
import { ART_PIECES } from './constants';
import Header from './components/Header';
import GalleryPage from './components/GalleryPage';
import ItemDetailPage from './components/ItemDetailPage';
import CartPage from './components/CartPage';
import Notification from './components/Notification';
import HomePage from './components/HomePage';
import SplashScreen from './components/SplashScreen';
import FilterSortControls from './components/FilterSortControls';

const ITEMS_PER_PAGE = 8;

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('splash');
  const [selectedArtId, setSelectedArtId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    artist: 'all',
    year: 'all',
    price: 'all',
  });
  const [sortBy, setSortBy] = useState('newest');
  const [galleryPage, setGalleryPage] = useState(1);

  useEffect(() => {
    setGalleryPage(1);
  }, [searchQuery, filters, sortBy]);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
    setSelectedArtId(null);
    window.scrollTo(0, 0);
  }, []);

  const handleViewArt = useCallback((id: number) => {
    setSelectedArtId(id);
    window.scrollTo(0, 0);
  }, []);
  
  const handleBackToGallery = useCallback(() => {
    setSelectedArtId(null);
  }, []);

  const addToCart = useCallback((itemToAdd: ArtItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === itemToAdd.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...itemToAdd, quantity: 1 }];
    });
    showNotification(`${itemToAdd.title} added to cart`);
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  }, []);

  const updateCartQuantity = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  }, [removeFromCart]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleFilterChange = useCallback((filterType: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value);
  }, []);

  const handleGalleryPageChange = useCallback((page: number) => {
    setGalleryPage(page);
    window.scrollTo(0, 0);
  }, []);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const processedArtPieces = useMemo(() => {
    let result = [...ART_PIECES];

    // Search filter
    if (searchQuery) {
      result = result.filter(art =>
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Artist filter
    if (filters.artist !== 'all') {
      result = result.filter(art => art.artist === filters.artist);
    }

    // Year filter
    if (filters.year !== 'all') {
      result = result.filter(art => art.year.toString() === filters.year);
    }

    // Price filter
    if (filters.price !== 'all') {
      const [min, max] = filters.price.split('-').map(Number);
      result = result.filter(art => {
        if (max) { // Range like "500-700"
          return art.price >= min && art.price <= max;
        }
        return art.price >= min; // Open-ended range like "701-Infinity"
      });
    }
    
    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'title-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
      default:
        result.sort((a, b) => b.year - a.year);
        break;
    }

    return result;
  }, [searchQuery, filters, sortBy]);

  const totalPages = useMemo(() => {
    return Math.ceil(processedArtPieces.length / ITEMS_PER_PAGE);
  }, [processedArtPieces]);

  const currentArtPieces = useMemo(() => {
    const startIndex = (galleryPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return processedArtPieces.slice(startIndex, endIndex);
  }, [processedArtPieces, galleryPage]);

  const renderContent = () => {
    if (selectedArtId) {
      const selectedArt = ART_PIECES.find(art => art.id === selectedArtId);
      if (selectedArt) {
        return <ItemDetailPage item={selectedArt} onAddToCart={addToCart} onBack={handleBackToGallery} />;
      }
    }
    
    switch(currentPage) {
      case 'cart':
        return <CartPage cart={cart} onUpdateQuantity={updateCartQuantity} onRemove={removeFromCart} onNavigate={handleNavigate} />;
      case 'gallery':
        return (
          <>
            <FilterSortControls 
              filters={filters}
              sortBy={sortBy}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              artPieces={ART_PIECES}
            />
            <GalleryPage
              artPieces={currentArtPieces}
              onViewArt={handleViewArt}
              onAddToCart={addToCart}
              currentPage={galleryPage}
              totalPages={totalPages}
              onPageChange={handleGalleryPageChange}
            />
          </>
        );
      case 'home':
      default:
        return <HomePage onViewArt={handleViewArt} onAddToCart={addToCart} onNavigate={handleNavigate} />;
    }
  };

  if (currentPage === 'splash') {
    return <SplashScreen onNavigate={() => handleNavigate('home')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header
        onNavigate={handleNavigate}
        cartItemCount={cartItemCount}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        currentPage={currentPage}
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {renderContent()}
      </main>
      <Notification message={notification} />
    </div>
  );
};

export default App;
