// File: src/components/marketplace/SidebarFilter.jsx

"use client";
import React, { useState, useEffect } from 'react';
import { Filter, DollarSign, Tag, CheckSquare, Layers, Zap, X, ChevronDown, ChevronUp } from 'lucide-react';

// Hardcoded future options (for structure and planning)
const TYPE_OPTIONS = ['All', 'Supply', 'Finished Craft', 'Digital Kit'];
const SKILL_OPTIONS = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const PRICE_TIERS = [
    { label: "Under $10", min: 0, max: 9.99 },
    { label: "$10 - $25", min: 10, max: 25 },
    { label: "$25 - $50", min: 25, max: 50 },
    { label: "Over $50", min: 50, max: 1000 },
];

const MIN_PRICE = 0;
const MAX_PRICE = 100; // Visualization max price for the slider bar ($0 - $100)

// Helper function to calculate slider position percentage for visualization
const getPercent = (value) => {
    // Clamping value to MAX_PRICE ensures the bar doesn't break if a filter exceeds 100
    const clampedValue = Math.min(value, MAX_PRICE);
    return ((clampedValue - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
};

// 🎯 Ensure categoryOptions is included in props 🎯
const SidebarFilter = ({ currentFilters, onFilterChange, categoryOptions }) => { 
    const [localFilters, setLocalFilters] = useState(currentFilters);
    const [priceInputChanged, setPriceInputChanged] = useState(false); 
    
    // State to control accordion visibility
    const [openSections, setOpenSections] = useState({ 
        price: true, category: true, type: false, skill: false, availability: true 
    });

    useEffect(() => {
        // Synchronize local state when parent state changes (e.g., global clear)
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
            // Price inputs (type="range" or type="number")
            newValue = type === 'range' || type === 'number' ? parseFloat(value) : value;

            // Ensure min <= max logic for range inputs
            if (name === 'priceMin' && newValue > localFilters.priceMax) {
                newValue = localFilters.priceMax;
            } else if (name === 'priceMax' && newValue < localFilters.priceMin) {
                newValue = localFilters.priceMin;
            }
            
            setPriceInputChanged(true);
        }

        const updatedFilters = {
            ...localFilters,
            [name]: newValue
        };
        
        setLocalFilters(updatedFilters);
        
        // INSTANT APPLY: For radio and checkbox changes
        if (type === 'radio' || type === 'checkbox') {
            if (name !== 'priceMin' && name !== 'priceMax') {
                applyFilters(updatedFilters);
            }
        }
    };

    // Called when range slider handles are released (onMouseUp/onTouchEnd)
    const handleApplyPrice = () => {
        applyFilters(localFilters);
    };

    const handleQuickPrice = (min, max) => {
        const newFilters = { ...localFilters, priceMin: min, priceMax: max };
        setLocalFilters(newFilters);
        applyFilters(newFilters);
    };

    const handleClear = () => {
        const defaultFilters = {
            search: '', category: 'All Crafts', productType: 'All', skillLevel: 'All', priceMin: 0, priceMax: 1000, inStock: false
        };
        applyFilters(defaultFilters);
    };

    const toggleSection = (name) => {
        setOpenSections(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const FilterSection = ({ title, children, icon: Icon, name }) => (
        <div className="border-b border-[var(--border-color)] py-4 last:border-b-0">
            <button 
                onClick={() => toggleSection(name)}
                className="w-full flex items-center justify-between text-lg font-bold text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
            >
                <span className="flex items-center">
                    <Icon className="w-5 h-5 mr-2 text-[var(--primary)]" />
                    {title}
                </span>
                {openSections[name] ? <ChevronUp className="w-4 h-4 text-[var(--foreground)] opacity-70" /> : <ChevronDown className="w-4 h-4 text-[var(--foreground)] opacity-70" />}
            </button>
            
            {/* Collapsible Content Area */}
            <div className={`mt-3 overflow-hidden transition-all duration-300 ${openSections[name] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                {children}
            </div>
        </div>
    );

    const renderRadioGroup = (name, options) => (
        <div className="space-y-2">
            {(options || []).map(option => ( 
                <div 
                    key={option} 
                    onClick={() => handleChange({ target: { name, value: option, type: 'radio' } })}
                    className={`flex items-center p-2 rounded-lg transition-colors cursor-pointer border 
                                ${localFilters[name] === option 
                                    ? 'bg-[var(--primary)]/10 border-[var(--primary)]/50 text-[var(--foreground)] font-semibold' 
                                    : 'border-transparent hover:bg-gray-100'}`}
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
                    <label htmlFor={`${name}-${option}`} className="ml-3 text-sm select-none cursor-pointer">
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

            {/* 1. Price Range Filter (Visual Slider with Interactivity) */}
            <FilterSection title="Price Range" icon={DollarSign} name="price">
                
                {/* 1.1 Quick Price Tiers */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                    {PRICE_TIERS.map((tier) => (
                        <button
                            key={tier.label}
                            onClick={() => handleQuickPrice(tier.min, tier.max === 1000 ? MAX_PRICE : tier.max)} 
                            className="bg-[var(--muted)] text-[var(--foreground)] opacity-90 text-xs font-semibold py-2 rounded-md hover:bg-[var(--primary)] hover:text-white transition-colors"
                        >
                            {tier.label}
                        </button>
                    ))}
                </div>

                {/* 1.2 Interactive Slider Visualization (Dual Handle) */}
                <div className="relative h-10 w-full mb-6">
                    {/* Track */}
                    <div className="absolute w-full h-1 bg-[var(--muted)] rounded-full top-1/2 transform -translate-y-1/2"></div>
                    
                    {/* Colored Range Bar (Highlights the selected range) */}
                    <div 
                        className="absolute h-1 bg-[var(--secondary)] rounded-full top-1/2 transform -translate-y-1/2"
                        style={{
                            left: `${getPercent(localFilters.priceMin)}%`,
                            right: `${100 - getPercent(localFilters.priceMax)}%`,
                            backgroundColor: 'var(--secondary)'
                        }}
                    ></div>
                    
                    {/* Min Range Input (Draggable handle) */}
                    <input
                        type="range"
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        value={localFilters.priceMin}
                        name="priceMin"
                        onChange={handleChange}
                        onMouseUp={handleApplyPrice}    // Apply filter instantly when drag stops
                        onTouchEnd={handleApplyPrice}   // Apply filter instantly when touch ends
                        className="absolute w-full h-full appearance-none bg-transparent opacity-0 cursor-pointer"
                        style={{ zIndex: 3, padding: 0 }}
                    />
                    
                    {/* Max Range Input (Draggable handle) */}
                    <input
                        type="range"
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        value={localFilters.priceMax}
                        name="priceMax"
                        onChange={handleChange}
                        onMouseUp={handleApplyPrice}    // Apply filter instantly when drag stops
                        onTouchEnd={handleApplyPrice}   // Apply filter instantly when touch ends
                        className="absolute w-full h-full appearance-none bg-transparent opacity-0 cursor-pointer"
                        style={{ zIndex: 4, padding: 0 }}
                    />
                    
                    {/* Price Labels */}
                    <div className="absolute w-full top-full flex justify-between pt-1">
                        <span className="text-sm font-semibold text-[var(--primary)]">${localFilters.priceMin.toFixed(0)}</span>
                        <span className="text-sm font-semibold text-[var(--primary)]">${localFilters.priceMax.toFixed(0)}</span>
                    </div>
                </div>
            </FilterSection>

            {/* 2. Category Filter */}
            <FilterSection title="Project Category" icon={Tag} name="category">
                {renderRadioGroup('category', categoryOptions)} 
            </FilterSection>

            {/* 3. Product Type Filter (Future Ready) */}
            <FilterSection title="Type (Supply/Craft)" icon={Layers} name="type">
                {renderRadioGroup('productType', TYPE_OPTIONS)}
            </FilterSection>

            {/* 4. Skill Level Filter (Future Ready) */}
            <FilterSection title="Skill Level" icon={Zap} name="skill">
                {renderRadioGroup('skillLevel', SKILL_OPTIONS)}
            </FilterSection>

            {/* 5. Availability Filter */}
            <FilterSection title="Availability" icon={CheckSquare} name="availability">
                <div 
                    className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-transparent"
                    onClick={() => handleChange({ target: { name: 'inStock', checked: !localFilters.inStock, type: 'checkbox' }})}
                >
                    <input
                        id="inStock" name="inStock" type="checkbox" checked={localFilters.inStock} 
                        onChange={handleChange} 
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