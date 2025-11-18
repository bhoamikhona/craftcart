// File: src/app/(main)/marketplace/page.jsx

"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Container from '@/components/layout/Container';
import ProductCard from '@/components/marketplace/ProductCard'; 
import SidebarFilter from '@/components/marketplace/SidebarFilter';
import { products as mockProducts } from '@/data/products';
import { ChevronDown, Loader2, X } from 'lucide-react';

const fetchProducts = async (filters) => {
    await new Promise(resolve => setTimeout(resolve, 300)); 
    let filtered = [...mockProducts];

    // --- MOCK FILTERING LOGIC (Must run before sorting) ---
    // ... (Your existing filtering logic remains here) ...
    if (filters.search) {
        const query = filters.search.toLowerCase();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query)
        );
    }
    if (filters.category && filters.category !== 'All Crafts') {
        filtered = filtered.filter(p => p.category === filters.category);
    }
    if (filters.inStock) {
        filtered = filtered.filter(p => p.inStock === true);
    }
    filtered = filtered.filter(p => p.price >= filters.priceMin && p.price <= filters.priceMax);


    // 🎯 FIX: Implement Sorting Logic 🎯
    if (filters.sort === 'priceAsc') {
        // Sort by price ascending (Low to High)
        filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'priceDesc') {
        // Sort by price descending (High to Low)
        filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sort === 'popular') {
        // Sort by popularity (using reviewCount)
        filtered.sort((a, b) => b.reviewCount - a.reviewCount); 
    } else if (filters.sort === 'latest') {
        // Sort by latest (using createdAt timestamp)
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    // PAGINATION
    const start = (filters.page - 1) * filters.limit;
    const end = start + filters.limit;
    const paginated = filtered.slice(start, end);

    return {
        data: paginated,
        totalProducts: filtered.length,
        totalPages: Math.ceil(filtered.length / filters.limit)
    };
};

const MarketplacePage = () => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalResults, setTotalResults] = useState(0);

    const [filters, setFilters] = useState({
        search: '',
        category: 'All Crafts',
        productType: 'All',      
        skillLevel: 'All',       
        priceMin: 0,
        priceMax: 1000, 
        sort: 'latest',
        inStock: false, 
        page: 1,
        limit: 12
    });
    const [totalPages, setTotalPages] = useState(1);
    
    // 🎯 FIX: Calculate Dynamic Categories from mockProducts 🎯
    const CATEGORY_OPTIONS = useMemo(() => {
        // Safe check for mockProducts array during build/initial load
        if (!mockProducts || mockProducts.length === 0) return ['All Crafts']; 
        
        const categories = new Set();
        mockProducts.forEach(product => {
            if (product.category) {
                categories.add(product.category);
            }
        });
        
        const uniqueCategories = Array.from(categories).sort();
        
        // Ensure 'All Crafts' is included and first
        if (uniqueCategories.includes('All Crafts')) {
            const index = uniqueCategories.indexOf('All Crafts');
            uniqueCategories.splice(index, 1);
        }
        
        return ['All Crafts', ...uniqueCategories];
    }, [mockProducts]);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const result = await fetchProducts(filters);
                setProductList(result.data);
                setTotalResults(result.totalProducts);
                setTotalPages(result.totalPages);
            } catch (error) {
                console.error("Error fetching products:", error);
                setProductList([]);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, [filters]); 

    const handleFilterChange = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters, page: 1 })); 
    };

    const handleSortChange = (e) => {
        setFilters(prev => ({ ...prev, sort: e.target.value, page: 1 }));
    };

    const handlePageChange = (newPage) => {
        setFilters(prev => ({ ...prev, page: newPage }));
    };
    
    // Handler for removing an active filter pill
    const handleRemoveFilter = (filterKey, defaultValue) => {
        setFilters(prev => ({
            ...prev,
            [filterKey]: defaultValue,
            page: 1,
        }));
    };

    // Helper function to extract active filters for display pills
    const getActiveFilters = () => {
        const active = [];
        if (filters.search) active.push({ key: 'search', label: `Search: "${filters.search}"`, resetValue: '' });
        if (filters.category && filters.category !== 'All Crafts') active.push({ key: 'category', label: `Category: ${filters.category}`, resetValue: 'All Crafts' });
        if (filters.inStock) active.push({ key: 'inStock', label: 'In Stock Only', resetValue: false });
        if (filters.priceMin > 0 || filters.priceMax < 1000) active.push({ key: 'priceMax', label: `Price: $${filters.priceMin} - $${filters.priceMax}`, resetValue: filters.priceMax });
        
        // Placeholder for future filters:
        if (filters.productType && filters.productType !== 'All') active.push({ key: 'productType', label: `Type: ${filters.productType}`, resetValue: 'All' });
        if (filters.skillLevel && filters.skillLevel !== 'All') active.push({ key: 'skillLevel', label: `Skill: ${filters.skillLevel}`, resetValue: 'All' });

        return active;
    };


    const Pagination = () => (
        <div className="flex justify-center space-x-2 mt-8">
            <button
                onClick={() => handlePageChange(filters.page - 1)}
                disabled={filters.page === 1}
                className="px-4 py-2 text-sm font-medium border border-[var(--border-color)] rounded-lg shadow-sm disabled:opacity-50 transition-colors bg-[var(--card-bg)] hover:bg-[var(--muted)]"
            >
                Previous
            </button>
            <span className="px-4 py-2 text-sm text-[var(--foreground)]">
                Page {filters.page} of {totalPages}
            </span>
            <button
                onClick={() => handlePageChange(filters.page + 1)}
                disabled={filters.page >= totalPages}
                className="px-4 py-2 text-sm font-medium border border-[var(--border-color)] rounded-lg shadow-sm disabled:opacity-50 transition-colors bg-[var(--card-bg)] hover:bg-[var(--muted)]"
            >
                Next
            </button>
        </div>
    );

    return (
        <Container>
            <div className="pt-8 md:pt-12 pb-12">
                
                {/* GLOBAL SEARCH BAR - Prominent Marketplace Feature */}
                {/* File: src/app/(main)/marketplace/page.jsx (Inside the return statement) */}

<div className="mb-8 p-4 rounded-xl border-2 border-[var(--border-color)] bg-[var(--card-bg)] shadow-xl transition-shadow duration-300 hover:shadow-2xl">
    <div className="flex items-center">
        {/* Optional: Add a Search Icon for visual cue */}
        <svg className="w-6 h-6 text-[var(--primary)] opacity-70 mr-3 shrink-0" 
             fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>

        <input
            type="search"
            placeholder="Search for supplies, kits, or finished crafts..."
            value={filters.search}
            onChange={(e) => handleFilterChange({ search: e.target.value })}
            
            // 🎯 ENHANCED CLASS LIST 🎯
            className="w-full text-lg 
                       text-[var(--foreground)] 
                       bg-transparent 
                       placeholder-[var(--foreground)] 
                       opacity-80
                       border-none 
                       focus:ring-0 
                       focus:border-none
                       outline-none"
        />
    </div>
</div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Sidebar for Filters */}
                    <div className="md:w-1/4">
                        <SidebarFilter 
                            currentFilters={filters}
                            onFilterChange={handleFilterChange}
                            // 🎯 FIX: Pass the CATEGORY_OPTIONS array 🎯
                            categoryOptions={CATEGORY_OPTIONS} 
                        />
                    </div>

                    {/* Right Main Content Area */}
                    <div className="md:w-3/4">
                        
                        {/* Active Filter Pills (High-tier UX) */}
                        {getActiveFilters().length > 0 && (
                            <div className="mb-4 flex flex-wrap gap-2 p-3 bg-[var(--muted)] rounded-lg border border-[var(--border-color)]">
                                <span className="text-sm font-semibold text-[var(--foreground)] mr-1">Active Filters:</span>
                                {getActiveFilters().map(filter => (
                                    <button
                                        key={filter.key}
                                        onClick={() => handleRemoveFilter(filter.key, filter.resetValue)}
                                        className="flex items-center text-xs font-medium bg-[var(--primary)] text-white px-3 py-1 rounded-full hover:bg-[var(--primary-hover)] transition-colors"
                                    >
                                        {filter.label}
                                        <X className="w-3 h-3 ml-1" />
                                    </button>
                                ))}
                            </div>
                        )}
                        
                        {/* Header with Sort and Results Count */}
<div className="flex justify-between items-center mb-6 border-b pb-4 border-[var(--border-color)]">
    <p className="text-base text-[var(--foreground)] font-semibold">
        {totalResults} Results Found
    </p>
    
    <div className="flex items-center space-x-2 relative">
        <label 
            htmlFor="sort-by" 
            className="text-sm text-[var(--foreground)] font-medium whitespace-nowrap"
        >
            Sort by:
        </label>
        
        <select
            id="sort-by"
            name="sort-by"
            value={filters.sort}
            onChange={handleSortChange}
            className="block appearance-none w-full bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--foreground)] py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow text-sm"
        >
            <option value="latest">Latest</option>
            <option value="popular">Popularity</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground)] opacity-60" />
    </div>
</div>


                        {/* Product Grid */}
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <Loader2 className="w-8 h-8 text-[var(--primary)] animate-spin" />
                                <span className="ml-3 text-lg text-[var(--foreground)] opacity-70">Loading amazing crafts...</span>
                            </div>
                        ) : productList.length === 0 ? (
                            <div className="text-center p-10 border border-[var(--border-color)] rounded-xl bg-[var(--muted)]">
                                <p className="text-xl text-[var(--foreground)] font-semibold">No products found. 😔</p>
                                <p className="text-[var(--foreground)] opacity-70 mt-2">Try adjusting your filters or search terms.</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {productList.map((product) => (
                                        <ProductCard key={product.productId} product={product} /> 
                                    ))}
                                </div>
                                
                                <Pagination />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default MarketplacePage;