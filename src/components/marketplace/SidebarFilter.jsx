// File: src/components/marketplace/SidebarFilter.jsx

"use client";
import React, { useState, useEffect } from 'react';
import { Filter, DollarSign, Tag, CheckSquare } from 'lucide-react';

const CATEGORY_OPTIONS = [
    'All Crafts', 'Macrame', 'Painting', 'Candle Making', 'Jewelry', 'Woodwork'
];

const SidebarFilter = ({ currentFilters, onFilterChange }) => {
    const [localFilters, setLocalFilters] = useState(currentFilters);

    useEffect(() => {
        setLocalFilters(currentFilters);
    }, [currentFilters]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setLocalFilters(prev => ({
            ...prev,
            [name]: newValue
        }));
    };

    const handleApply = () => {
        onFilterChange(localFilters);
    };

    const handleClear = () => {
        const defaultFilters = {
            search: '', category: '', priceMin: 0, priceMax: 1000, inStock: true
        };
        setLocalFilters(prev => ({ ...prev, ...defaultFilters }));
        onFilterChange(defaultFilters);
    };

    const FilterSection = ({ title, children, icon: Icon }) => (
        // Border color uses variable
        <div className="border-b border-[var(--border-color)] py-6">
            <h3 className="flex items-center text-lg font-semibold text-[var(--foreground)] mb-4">
                {/* Icons use the primary color */}
                <Icon className="w-5 h-5 mr-2 text-[var(--primary)]" />
                {title}
            </h3>
            {children}
        </div>
    );

    return (
        // Card background and border use utility classes/variables
        <div className="card sticky top-4 p-6 shadow-xl">
            <h2 className="flex items-center text-2xl font-bold text-[var(--foreground)] mb-6">
                <Filter className="w-6 h-6 mr-2 text-[var(--primary)]" />
                Filters
            </h2>

            {/* Price Range Filter (Matching priceMin, priceMax) */}
            <FilterSection title="Price Range" icon={DollarSign}>
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm text-[var(--foreground)] opacity-70">
                        <span>Min: ${localFilters.priceMin}</span>
                        <span>Max: ${localFilters.priceMax}</span>
                    </div>
                    
                    {/* Range input */}
                    <label htmlFor="priceMin" className="sr-only">Minimum Price</label>
                    <input
                        type="range"
                        id="priceMin"
                        name="priceMin"
                        min="0"
                        max="500"
                        value={localFilters.priceMin}
                        onChange={handleChange}
                        className="w-full h-2 bg-[var(--muted)] rounded-lg appearance-none cursor-pointer range-sm accent-[var(--primary)]"
                    />

                    {/* Max price input */}
                    <div className="mt-2">
                        <label htmlFor="priceMax" className="block text-xs font-medium text-[var(--foreground)] opacity-70">Max Price (Input)</label>
                         <input
                            type="number"
                            id="priceMax"
                            name="priceMax"
                            min={localFilters.priceMin}
                            max="1000"
                            value={localFilters.priceMax}
                            onChange={handleChange}
                            className="w-full border border-[var(--border-color)] rounded-md p-2 text-sm focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                        />
                    </div>
                </div>
            </FilterSection>

            {/* Category Filter (Matching category) */}
            <FilterSection title="Category" icon={Tag}>
                <div className="space-y-2">
                    {CATEGORY_OPTIONS.map(category => (
                        <div key={category} className="flex items-center">
                            <input
                                id={`category-${category}`}
                                name="category"
                                type="radio"
                                value={category}
                                checked={localFilters.category === category || (localFilters.category === '' && category === 'All Crafts')}
                                onChange={handleChange}
                                // Radio button color uses the primary variable
                                className="h-4 w-4 text-[var(--primary)] border-[var(--border-color)] focus:ring-[var(--primary)]"
                            />
                            <label htmlFor={`category-${category}`} className="ml-3 text-sm text-[var(--foreground)] cursor-pointer">
                                {category}
                            </label>
                        </div>
                    ))}
                </div>
            </FilterSection>

            {/* In Stock Filter (Matching inStock) */}
            <FilterSection title="Availability" icon={CheckSquare}>
                <div className="flex items-center">
                    <input
                        id="inStock"
                        name="inStock"
                        type="checkbox"
                        checked={localFilters.inStock}
                        onChange={handleChange}
                        // Checkbox color uses the primary variable
                        className="h-4 w-4 rounded text-[var(--primary)] border-[var(--border-color)] focus:ring-[var(--primary)]"
                    />
                    <label htmlFor="inStock" className="ml-3 text-sm text-[var(--foreground)]">
                        Show only In Stock items
                    </label>
                </div>
            </FilterSection>

            {/* Action Buttons */}
            <div className="pt-6 space-y-3">
                <button
                    onClick={handleApply}
                    // Uses the defined btn-primary utility class
                    className="w-full flex items-center justify-center btn-primary text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)]"
                >
                    Apply Filters
                </button>
                <button
                    onClick={handleClear}
                    className="w-full flex items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-2 text-base font-medium text-[var(--foreground)] shadow-sm hover:bg-[var(--muted)] transition-colors"
                >
                    Clear All
                </button>
            </div>
        </div>
    );
};

export default SidebarFilter;