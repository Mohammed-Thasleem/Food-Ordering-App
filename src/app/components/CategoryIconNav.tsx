import React from 'react';
import { 
  Beef, 
  Fish, 
  Soup, 
  Pizza, 
  IceCream, 
  Coffee,
  Salad,
  Sandwich,
  Drumstick,
  UtensilsCrossed,
  Cake,
  Cookie
} from 'lucide-react';

interface CategoryIconNavProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  'All': UtensilsCrossed,
  'Starters': Salad,
  'Main Course': Pizza,
  'Desserts': Cake,
  'Drinks': Coffee,
};

export const CategoryIconNav: React.FC<CategoryIconNavProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const buttonRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});

  // Auto-scroll to active category button
  React.useEffect(() => {
    const activeButton = buttonRefs.current[activeCategory];
    const container = containerRef.current;
    
    if (activeButton && container) {
      const containerWidth = container.offsetWidth;
      const buttonLeft = activeButton.offsetLeft;
      const buttonWidth = activeButton.offsetWidth;
      const scrollLeft = buttonLeft - containerWidth / 2 + buttonWidth / 2;
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }, [activeCategory]);

  return (
    <div ref={containerRef} className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide px-1">
      {categories.map((category) => {
        const Icon = categoryIcons[category] || UtensilsCrossed;
        const isActive = activeCategory === category;
        
        return (
          <button
            key={category}
            ref={(el) => (buttonRefs.current[category] = el)}
            onClick={() => onCategoryChange(category)}
            className={`flex flex-col items-center gap-1.5 min-w-[64px] transition-all ${
              isActive ? 'opacity-100' : 'opacity-60'
            }`}
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? 'bg-orange-500 text-white shadow-md scale-105'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              {category}
            </span>
          </button>
        );
      })}
    </div>
  );
};