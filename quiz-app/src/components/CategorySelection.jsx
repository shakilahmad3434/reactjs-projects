import React from 'react';
import { Book, Clapperboard, Cpu, FlaskConical, ForkKnife, Globe, Landmark, Music, Palette, Volleyball, } from 'lucide-react';

const iconMap = {
  Cpu: Cpu,
  Flask: FlaskConical,
  Landmark: Landmark,
  Globe: Globe,
  Soccer: Volleyball,
  Movie: Clapperboard,
  Book: Book,
  Palette: Palette,
  Music: Music,
  ForkKnife: ForkKnife
};

export default function CategorySelection({ categories, onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {categories.map((category) => {
        const Icon = iconMap[category.icon];
        return (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center space-y-4"
          >
            <Icon className="w-12 h-12 text-indigo-600" />
            <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
          </button>
        );
      })}
    </div>
  );
}