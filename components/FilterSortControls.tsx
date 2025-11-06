
import React, { useMemo } from 'react';
import { ArtItem } from '../types';

interface FilterSortControlsProps {
  filters: {
    artist: string;
    year: string;
    price: string;
  };
  sortBy: string;
  onFilterChange: (filterType: 'artist' | 'year' | 'price', value: string) => void;
  onSortChange: (value: string) => void;
  artPieces: ArtItem[];
}

const FilterSortControls: React.FC<FilterSortControlsProps> = ({
  filters,
  sortBy,
  onFilterChange,
  onSortChange,
  artPieces
}) => {
  const uniqueArtists = useMemo(() => [...new Set(artPieces.map(art => art.artist))].sort(), [artPieces]);
  // FIX: Explicitly type `a` and `b` as numbers in the sort callback to resolve the TypeScript error.
  const uniqueYears = useMemo(() => [...new Set(artPieces.map(art => art.year))].sort((a: number, b: number) => b - a), [artPieces]);

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-499', label: 'Under $500' },
    { value: '500-700', label: '$500 - $700' },
    { value: '701-Infinity', label: 'Over $700' },
  ];
  
  const sortOptions = [
      { value: 'newest', label: 'Newest First' },
      { value: 'title-asc', label: 'Title (A-Z)' },
      { value: 'price-asc', label: 'Price (Low to High)' },
      { value: 'price-desc', label: 'Price (High to Low)' },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
                <label htmlFor="artist-filter" className="block text-sm font-medium text-gray-700 mb-1">Artist</label>
                <select
                    id="artist-filter"
                    value={filters.artist}
                    onChange={(e) => onFilterChange('artist', e.target.value)}
                    className="w-full pl-3 pr-8 py-2 text-base border-gray-300 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm rounded-md"
                >
                    <option value="all">All Artists</option>
                    {uniqueArtists.map(artist => (
                        <option key={artist} value={artist}>{artist}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="year-filter" className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <select
                    id="year-filter"
                    value={filters.year}
                    onChange={(e) => onFilterChange('year', e.target.value)}
                    className="w-full pl-3 pr-8 py-2 text-base border-gray-300 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm rounded-md"
                >
                    <option value="all">All Years</option>
                    {uniqueYears.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="price-filter" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <select
                    id="price-filter"
                    value={filters.price}
                    onChange={(e) => onFilterChange('price', e.target.value)}
                    className="w-full pl-3 pr-8 py-2 text-base border-gray-300 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm rounded-md"
                >
                    {priceRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="w-full pl-3 pr-8 py-2 text-base border-gray-300 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm rounded-md"
                >
                    {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
        </div>
    </div>
  );
};

export default FilterSortControls;
