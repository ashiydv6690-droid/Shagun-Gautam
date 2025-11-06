import React from 'react';
import RippleButton from './RippleButton';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  const getPaginationGroup = () => {
    const pages = [];
    if (totalPages <= 7) { // Show all pages if 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logic for more than 7 pages
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage > totalPages - 4) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <nav className="flex items-center justify-center pt-12" aria-label="Pagination">
      <RippleButton
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        rippleClassName="ripple-dark"
      >
        <span className="sr-only">Previous</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </RippleButton>
      
      {getPaginationGroup().map((page, index) => {
        if (page === '...') {
          return (
            <span key={`${page}-${index}`} className="relative inline-flex items-center px-4 py-2 border-y border-gray-300 bg-white text-sm font-medium text-gray-700 -ml-px">
              ...
            </span>
          );
        }
        
        const isCurrent = page === currentPage;
        const baseClasses = 'relative inline-flex items-center px-4 py-2 border-y text-sm font-medium -ml-px';
        const activeClasses = 'z-10 bg-accent border-accent text-white';
        const defaultClasses = 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50';

        return (
          <RippleButton
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`${baseClasses} ${isCurrent ? activeClasses : defaultClasses}`}
            rippleClassName={isCurrent ? '' : 'ripple-dark'}
            aria-current={isCurrent ? 'page' : undefined}
          >
            {page}
          </RippleButton>
        );
      })}

      <RippleButton
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed -ml-px"
        rippleClassName="ripple-dark"
      >
        <span className="sr-only">Next</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </RippleButton>
    </nav>
  );
};

export default Pagination;
