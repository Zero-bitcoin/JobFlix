import { Button } from "@/components/ui/button";

interface Category {
  name: string;
  count: number;
  icon: string;
}

interface CategoryCarouselProps {
  categories: Category[];
  onCategorySelect: (category: string) => void;
}

export default function CategoryCarousel({ categories, onCategorySelect }: CategoryCarouselProps) {
  const getIconComponent = (iconClass: string) => {
    // Map Font Awesome classes to appropriate icons in Netflix style
    const iconMap: Record<string, string> = {
      "fas fa-code": "💻",
      "fas fa-paint-brush": "🎨", 
      "fas fa-chart-line": "📈",
      "fas fa-users": "👥",
      "fas fa-cogs": "⚙️",
      "fas fa-handshake": "🤝",
      "fas fa-heartbeat": "🏥",
      "fas fa-graduation-cap": "🎓",
      "fas fa-dollar-sign": "💰",
      "fas fa-briefcase": "💼"
    };
    
    return iconMap[iconClass] || "💼";
  };

  return (
    <div className="overflow-x-auto scroll-container">
      <div className="flex space-x-4 pb-4" style={{ width: "max-content" }}>
        {categories.map((category) => (
          <Button
            key={category.name}
            variant="ghost"
            onClick={() => onCategorySelect(category.name)}
            className="filter-chip bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 min-w-[200px] cursor-pointer border border-gray-700 hover:border-netflix-red transition-all duration-300 flex flex-col items-start h-auto shadow-lg hover:shadow-red-500/20 transform hover:scale-105 relative z-10"
          >
            <div className="text-2xl mb-3 filter drop-shadow-lg">
              {getIconComponent(category.icon)}
            </div>
            <h3 className="font-semibold mb-2 text-left">{category.name}</h3>
            <p className="netflix-text text-sm">
              {category.count} posizioni
            </p>
          </Button>
        ))}
      </div>
    </div>
  );
}
