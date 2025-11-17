// File: src/app/(main)/marketplace/page.jsx

"use client";
import React, { useState, useEffect } from 'react';
import Container from '@/components/layout/Container';
import ProductCard from '@/components/marketplace/ProductCard'; 
import SidebarFilter from '@/components/marketplace/SidebarFilter';
import { products as mockProducts } from '@/data/products';
import { ChevronDown, Loader2 } from 'lucide-react';

const fetchProducts = async (filters) => {
    console.log('Fetching products with filters:', filters);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800)); 
    
    let filtered = mockProducts;
    
    // --- MOCK FILTERING LOGIC ---
    if (filters.sort === 'priceAsc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'priceDesc') {
        filtered.sort((a, b) => b.price - a.price);
    } 
    // Add filtering by category, inStock etc. here if needed for mock data
    
    // Simple pagination simulation
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
    // 1. State for Products and Loading
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalResults, setTotalResults] = useState(0);

    // 2. State for Filters
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        priceMin: 0,
        priceMax: 1000, 
        sort: 'latest', // Default sort
        inStock: true,
        page: 1,
        limit: 12
    });
    const [totalPages, setTotalPages] = useState(1);

    // 3. Effect to fetch data when filters change
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

    // 4. Handlers for Filter, Sort, and Pagination changes
    const handleFilterChange = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters, page: 1 })); 
    };

    const handleSortChange = (e) => {
        setFilters(prev => ({ ...prev, sort: e.target.value, page: 1 }));
    };

    const handlePageChange = (newPage) => {
        setFilters(prev => ({ ...prev, page: newPage }));
    };

    // Simple Pagination component (Inline for simplicity)
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
            <div className="py-12">
                <h1 className="text-4xl font-extrabold tracking-tight text-[var(--primary)] mb-2">
                    🛒 CraftCart Marketplace
                </h1>
                <p className="text-lg text-[var(--foreground)] opacity-80 mb-8 border-b border-[var(--border-color)] pb-4">
                    Find high-quality supplies and finished crafts from our community.
                </p>
                
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Sidebar for Filters */}
                    <div className="md:w-1/4">
                        <SidebarFilter 
                            currentFilters={filters}
                            onFilterChange={handleFilterChange}
                        />
                    </div>

                    {/* Right Main Content Area */}
                    <div className="md:w-3/4">
                        {/* Header with Sort and Results Count */}
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-sm text-[var(--foreground)] opacity-70">
                                Showing {totalResults > 0 ? (filters.page - 1) * filters.limit + 1 : 0}–
                                {Math.min(filters.page * filters.limit, totalResults)} of {totalResults} results
                            </p>
                            
                            <div className="flex items-center space-x-2 relative">
                                <label htmlFor="sort-by" className="text-sm text-[var(--foreground)] font-medium">Sort by:</label>
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
                            <div className="text-center p-10 border border-[var(--border-color)] rounded-lg bg-[var(--muted)]">
                                <p className="text-xl text-[var(--foreground)] font-semibold">No products found. 😔</p>
                                <p className="text-[var(--foreground)] opacity-70 mt-2">Try adjusting your filters or search terms.</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {productList.map((product) => (
                                        // key should ideally be 'id' from the database structure
                                        <ProductCard key={product.id || product.productId} product={product} /> 
                                    ))}
                                </div>
                                
                                {/* Pagination */}
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