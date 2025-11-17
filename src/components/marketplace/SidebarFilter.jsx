// File: src/components/marketplace/SidebarFilter.jsx

"use client";
import React, { useState, useEffect } from 'react';
import { Filter, DollarSign, Tag, CheckSquare, Layers, Zap, X } from 'lucide-react';

const TYPE_OPTIONS = ['All', 'Supply', 'Finished Craft', 'Digital Kit'];
const SKILL_OPTIONS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

// 🎯 Ensure categoryOptions is included in props 🎯
const SidebarFilter = ({ currentFilters, onFilterChange, categoryOptions }) => { 
    const [localFilters, setLocalFilters] = useState(currentFilters);
    const [priceInputChanged, setPriceInputChanged] = useState(false); 

    useEffect(() => {
        setLocalFilters(currentFilters);
    }, [currentFilters]);

    const applyFilters = (newFilters) => {
        onFilterChange(newFilters);
        setPriceInputChanged(false); 
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        let newValue;
        if (type === 'checkbox') {
            newValue = checked;
        } else if (type === 'radio') {
            newValue = value;
        } else {
            newValue = type === 'number' ? parseFloat(value) : value;
            setPriceInputChanged(true);
        }

        const updatedFilters = {
            ...localFilters,
            [name]: newValue
        };
        
        setLocalFilters(updatedFilters);
        
        // 🎯 INSTANT APPLY: Only for radio and checkbox changes 🎯
        if (type === 'radio' || type === 'checkbox') {
            // Apply only if the change is NOT price (handled by dedicated button)
            if (name !== 'priceMin' && name !== 'priceMax') {
                applyFilters(updatedFilters);
            }
        }
    };

    const handleApplyPrice = () => {
        applyFilters(localFilters);
    };

    const handleClear = () => {
        const defaultFilters = {
            search: '', category: 'All Crafts', productType: 'All', skillLevel: 'All', priceMin: 0, priceMax: 1000, inStock: false
        };
        applyFilters(defaultFilters);
    };

    const FilterSection = ({ title, children, icon: Icon }) => (
        <div className="border-b border-[var(--border-color)] py-6 last:border-b-0">
            <h3 className="flex items-center text-lg font-bold text-[var(--foreground)] mb-4">
                <Icon className="w-5 h-5 mr-2 text-[var(--primary)]" />
                {title}
            </h3>
            {children}
        </div>
    );

    const renderRadioGroup = (name, options) => (
        <div className="space-y-2">
            {/* 🎯 FIX APPLIED HERE: Ensure options is an array before mapping 🎯 */}
            {(options || []).map(option => ( 
                <div 
                    key={option} 
                    onClick={() => handleChange({ target: { name, value: option, type: 'radio' } })}
                    className={`flex items-center p-2 rounded-lg transition-colors cursor-pointer
                                ${localFilters[name] === option ? 'bg-[var(--muted)]' : 'hover:bg-gray-50'}`}
                >
                    <input
                        id={`${name}-${option}`}
                        name={name}
                        type="radio"
                        value={option}
                        checked={localFilters[name] === option}
                        onChange={handleChange} 
                        className="h-4 w-4 text-[var(--primary)] border-[var(--border-color)] focus:ring-[var(--primary)] cursor-pointer"
                    />
                    <label htmlFor={`${name}-${option}`} className="ml-3 text-sm text-[var(--foreground)] select-none cursor-pointer">
                        {option}
                    </label>
                </div>
            ))}
        </div>
    );

    return (
        <div className="card sticky top-4 p-6 shadow-2xl">
            <h2 className="flex items-center text-2xl font-extrabold text-[var(--foreground)] mb-8 border-b pb-3 border-[var(--border-color)]">
                <Filter className="w-6 h-6 mr-3 text-[var(--primary)]" />
                Refine Your Craft
            </h2>

            {/* Price Range Filter */}
            <FilterSection title="Price Range" icon={DollarSign}>
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-semibold text-[var(--primary)]">
                        <span>Min: **${localFilters.priceMin}**</span>
                        <span>Max: **${localFilters.priceMax}**</span>
                    </div>
                    
                    <div className="flex space-x-2">
                        {/* Min Price Input */}
                        <input
                            type="number" id="priceMin" name="priceMin" min="0" max={localFilters.priceMax} 
                            value={localFilters.priceMin} onChange={handleChange} placeholder="Min"
                            className="w-1/2 border border-[var(--border-color)] rounded-md p-2 text-sm focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-shadow"
                        />
                        {/* Max Price Input */}
                        <input
                            type="number" id="priceMax" name="priceMax" min={localFilters.priceMin} max="1000" 
                            value={localFilters.priceMax} onChange={handleChange} placeholder="Max"
                            className="w-1/2 border border-[var(--border-color)] rounded-md p-2 text-sm focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-shadow"
                        />
                    </div>
                </div>
                
                {/* Dedicated Apply Button for Price */}
                <div className="mt-4">
                    <button
                        onClick={handleApplyPrice} disabled={!priceInputChanged}
                        className={`w-full text-sm font-medium rounded-lg px-4 py-2 transition-all 
                                    ${priceInputChanged ? 'btn-primary' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                    >
                        {priceInputChanged ? 'Apply Price Range' : 'Price is Updated'}
                    </button>
                </div>
            </FilterSection>

            {/* Category Filter */}
            <FilterSection title="Project Category" icon={Tag}>
                {/* 🎯 FIX APPLIED HERE 🎯 */}
                {renderRadioGroup('category', categoryOptions)} 
            </FilterSection>

            {/* Product Type Filter (Future Ready) */}
            <FilterSection title="Type" icon={Layers}>
                {renderRadioGroup('productType', TYPE_OPTIONS)}
            </FilterSection>

            {/* Skill Level Filter (Future Ready) */}
            <FilterSection title="Skill Level" icon={Zap}>
                {renderRadioGroup('skillLevel', SKILL_OPTIONS)}
            </FilterSection>

            {/* In Stock Filter */}
            <FilterSection title="Availability" icon={CheckSquare}>
                <div className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                     onClick={() => handleChange({ target: { name: 'inStock', checked: !localFilters.inStock, type: 'checkbox' } })}>
                    <input
                        id="inStock" name="inStock" type="checkbox" checked={localFilters.inStock} 
                        onChange={handleChange} // Keep this for standard form updates
                        className="h-4 w-4 rounded text-[var(--primary)] border-[var(--border-color)] focus:ring-[var(--primary)] cursor-pointer"
                    />
                    <label htmlFor="inStock" className="ml-3 text-sm text-[var(--foreground)] select-none cursor-pointer">
                        Show only In Stock items
                    </label>
                </div>
            </FilterSection>

            {/* Global Clear Button */}
            <div className="pt-6">
                <button
                    onClick={handleClear}
                    className="w-full flex items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-2 text-base font-medium text-[var(--foreground)] shadow-sm hover:bg-[var(--muted)] transition-colors"
                >
                    <X className="w-4 h-4 mr-2" />
                    Clear All Filters
                </button>
            </div>
        </div>
    );
};

export default SidebarFilter;