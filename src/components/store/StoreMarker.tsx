
import { memo } from 'react';
import { Shop } from '@/types/shop';

interface StoreMarkerProps {
  shop: Shop;
  isSelected: boolean;
  onClick: (id: string) => void;
}

export const StoreMarker = memo(({ shop, isSelected, onClick }: StoreMarkerProps) => {
  // Handle click with proper event stopping
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(shop.id);
  };

  return (
    <div 
      onClick={handleClick}
      className={`
        flex items-center justify-center rounded-full shadow-md cursor-pointer
        transition-all duration-200 ease-in-out
        ${isSelected 
          ? 'w-10 h-10 bg-primary text-white ring-2 ring-primary' 
          : 'w-8 h-8 bg-gray-200 text-gray-700 hover:bg-gray-300'}
      `}
      title={shop.name}
    >
      <span className="font-bold">
        {shop.name.charAt(0)}
      </span>
    </div>
  );
});

StoreMarker.displayName = 'StoreMarker';
