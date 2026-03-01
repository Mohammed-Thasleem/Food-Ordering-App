import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { useTable } from '../context/TableContext';
import { restaurantInfo, menuItems, categories } from '../data/mockData';
import { MenuItemListItem } from '../components/MenuItemListItem';
import { CategoryIconNav } from '../components/CategoryIconNav';
import { CartDrawer } from '../components/CartDrawer';
import { ThemeToggle } from '../components/ThemeToggle';
import { Button } from '../components/ui/button';
import { Receipt, Search, Users } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useOrder } from '../context/OrderContext';
import { OrderStatusBadge } from '../components/OrderStatusBadge';

export const TablePage: React.FC = () => {
  const { tableId } = useParams<{ tableId: string }>();
  const { setTable } = useTable();
  const { currentOrder } = useOrder();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isScrollingRef = useRef(false);

  useEffect(() => {
    if (tableId) {
      setTable({
        id: tableId,
        number: parseInt(tableId),
      });
    }
  }, [tableId, setTable]);

  // Scroll spy - update active category based on scroll position
  useEffect(() => {
    if (searchQuery) return; // Don't work during search

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return; // Don't update during programmatic scroll

        // Find the most visible category
        let mostVisible = { category: 'All', ratio: 0 };
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > mostVisible.ratio) {
            const category = entry.target.getAttribute('data-category');
            if (category) {
              mostVisible = { category, ratio: entry.intersectionRatio };
            }
          }
        });

        // Only update if we found a visible category with significant visibility
        if (mostVisible.ratio > 0.3) {
          setActiveCategory(mostVisible.category);
        } else if (window.scrollY < 300) {
          // If near the top, default to "All"
          setActiveCategory('All');
        }
      },
      {
        threshold: [0, 0.3, 0.5, 0.7, 1],
        rootMargin: '-180px 0px -50% 0px', // Account for sticky header
      }
    );

    Object.values(categoryRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [searchQuery]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    if (category === 'All') {
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (categoryRefs.current[category]) {
      // Smooth scroll to category section
      isScrollingRef.current = true;
      const element = categoryRefs.current[category];
      if (element) {
        const headerOffset = 200; // Height of sticky headers
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        // Reset scrolling flag after animation
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 1000);
      }
    }
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group items by category for display
  const groupedItems = filteredItems.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                {restaurantInfo.logo}
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900 dark:text-gray-100">
                  {restaurantInfo.name}
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Table {tableId}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
              >
                <Users className="h-4 w-4 mr-1" />
                Group Orders
              </Button>
              <ThemeToggle />
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search items"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {currentOrder && (
            <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg mb-2">
              <span className="text-xs font-medium">Current Order</span>
              <div className="flex items-center gap-2">
                <OrderStatusBadge status={currentOrder.status} />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/bill')}
                  className="h-7 text-xs"
                >
                  <Receipt className="h-3.5 w-3.5 mr-1" />
                  Bill
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category Icon Navigation */}
      <div className="sticky top-[140px] z-30 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <CategoryIconNav
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-4 pb-24">
        {/* Menu Items List */}
        {activeCategory === 'All' ? (
          // Show all categories with headers
          Object.entries(groupedItems).map(([category, items]) => (
            <div 
              key={category} 
              className="mb-6"
              ref={(el) => (categoryRefs.current[category] = el)}
              data-category={category}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
                  {category} ({items.length})
                </h2>
                <button 
                  className="text-orange-500 text-sm"
                  onClick={() => handleCategoryChange(category)}
                >
                  View All
                </button>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg">
                {items.map((item) => (
                  <MenuItemListItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))
        ) : (
          // Show single category
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
                {activeCategory} ({filteredItems.length})
              </h2>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg">
              {filteredItems.map((item) => (
                <MenuItemListItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No items found
            </p>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
};