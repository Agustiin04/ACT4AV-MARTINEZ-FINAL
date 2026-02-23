"use client";

import { ArrowUpDown } from "lucide-react";

interface ProductSortProps {
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

const sortOptions = [
  { value: "newest", label: "Más recientes" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "rating", label: "Mejor valorados" },
  { value: "name", label: "Nombre A-Z" },
];

export default function ProductSort({ sortBy, onSortChange }: ProductSortProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <ArrowUpDown size={20} />
        <span>Ordenar por</span>
      </div>
      
      <div className="space-y-2">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={`
              w-full text-left p-3 rounded-lg transition
              ${sortBy === option.value
                ? "bg-blue-50 text-blue-600 border border-blue-200"
                : "bg-gray-50 hover:bg-gray-100"
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
