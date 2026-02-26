import { MenuItem } from '../types';

// Image URLs from Unsplash
const imageMap: Record<string, string> = {
  'spring-rolls-appetizer': 'https://images.unsplash.com/photo-1768701544400-dfa8ca509d10?w=400&h=300&fit=crop',
  'buffalo-chicken-wings': 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&h=300&fit=crop',
  'mushroom-soup-bowl': 'https://images.unsplash.com/photo-1759689975548-2e3a06b3d816?w=400&h=300&fit=crop',
  'bruschetta-tomato-basil': 'https://images.unsplash.com/photo-1630230596557-ad07b433f5c0?w=400&h=300&fit=crop',
  'fried-calamari-rings': 'https://images.unsplash.com/photo-1734771219838-61863137b117?w=400&h=300&fit=crop',
  'margherita-pizza': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
  'grilled-salmon-fillet': 'https://images.unsplash.com/photo-1758157836016-3f3fbc5bf796?w=400&h=300&fit=crop',
  'fettuccine-alfredo-chicken': 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&h=300&fit=crop',
  'vegetarian-burger': 'https://images.unsplash.com/photo-1562634382-d41bfc15aa4a?w=400&h=300&fit=crop',
  'ribeye-steak-grilled': 'https://images.unsplash.com/photo-1626203313658-886791f37e46?w=400&h=300&fit=crop',
  'vegetable-stir-fry': 'https://images.unsplash.com/photo-1464500650248-1a4b45debb9f?w=400&h=300&fit=crop',
  'seafood-paella-spanish': 'https://images.unsplash.com/photo-1747709790554-092f0e5723df?w=400&h=300&fit=crop',
  'paneer-tikka-masala': 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop',
  'chocolate-lava-cake': 'https://images.unsplash.com/photo-1673551490812-eaee2e9bf0ef?w=400&h=300&fit=crop',
  'tiramisu-dessert': 'https://images.unsplash.com/photo-1714385905983-6f8e06fffae1?w=400&h=300&fit=crop',
  'new-york-cheesecake': 'https://images.unsplash.com/photo-1611497438246-dcbb383de3c4?w=400&h=300&fit=crop',
  'ice-cream-sundae': 'https://images.unsplash.com/photo-1657225953401-5f95007fc8e0?w=400&h=300&fit=crop',
  'fresh-orange-juice': 'https://images.unsplash.com/photo-1707569517904-92b134ff5f69?w=400&h=300&fit=crop',
  'iced-coffee-cold': 'https://images.unsplash.com/photo-1629991964567-3107a9202778?w=400&h=300&fit=crop',
  'mango-smoothie': 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&h=300&fit=crop',
  'coca-cola-glass': 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop',
  'mineral-water-bottle': 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop',
};

export function getMenuItemImage(item: MenuItem): string {
  return imageMap[item.image] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';
}
