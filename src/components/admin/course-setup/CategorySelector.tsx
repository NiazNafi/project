import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react"; // Import all Lucide icons dynamically
import { AddCategoryCard } from "./category/addCategoryCard";
import { AddCategoryModal } from "./category/AddCategoryModal";
import { v4 as uuidv4 } from "uuid";
interface Category {
  id: string;
  name: string;
  icon: string | JSX.Element; // Icon can be a string (name) or a JSX element
  createdAt: string;
  updatedAt: string;
}

interface CategorySelectorProps {
  initialCategory?: string;
  onUpdate: (category: string) => void;
  categories: Category[];
}

const colorList = [
  "blue",
  "red",
  "green",
  "yellow",
  "purple",
  "orange",
  "cyan",
  "teal",
  "pink",
  "amber",
]; // Define your list of colors

const getColorClasses = (color: string, isSelected: boolean) => {
  const baseClasses = "border-2 rounded-lg p-6 transition-all";
  if (!isSelected) {
    return `${baseClasses} border-gray-200 hover:border-gray-300 hover:shadow-md`;
  }

  const colorMap = {
    blue: "border-blue-500 bg-blue-50",
    red: "border-red-500 bg-red-50",
    green: "border-green-500 bg-green-50",
    yellow: "border-yellow-500 bg-yellow-50",
    purple: "border-purple-500 bg-purple-50",
    orange: "border-orange-500 bg-orange-50",
    cyan: "border-cyan-500 bg-cyan-50",
    teal: "border-teal-500 bg-teal-50",
    pink: "border-pink-500 bg-pink-50",
    amber: "border-amber-500 bg-amber-50",
  };

  return `${baseClasses} ${
    colorMap[color as keyof typeof colorMap] || colorMap.blue
  }`;
};

export function CategorySelector({
  initialCategory,
  onUpdate,
  categories,
}: CategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory || null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localCategories, setLocalCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    const assignColorsBySerial = () => {
      const updatedCategories = categories.map((category, index) => ({
        ...category,
        color: colorList[index % colorList.length], // Assign color based on index
      }));
      setLocalCategories(updatedCategories);
    };

    assignColorsBySerial();
  }, [categories]);

  const handleAddCategory = (newCategory: { name: string; icon: string }) => {
    const categoryId = uuidv4();
    const newCategoryIndex = localCategories.length;

    const category = {
      id: categoryId,
      name: newCategory.name,
      icon: newCategory.icon,
      color: colorList[newCategoryIndex % colorList.length],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setLocalCategories([...localCategories, category]); // Update local state
    setIsModalOpen(false);

    // Notify parent about the new category
    onUpdate({ type: "add", category });
  };

  const handleSelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onUpdate({ type: "select", categoryId });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Select Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {localCategories.map((category) => {
          const IconComponent =
            typeof category.icon === "string"
              ? Icons[category.icon] || Icons.BookOpen // Dynamically get the icon component or fallback
              : category.icon; // Directly use the JSX if provided
          const isSelected = selectedCategory === category.id;

          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(category.id)}
              className={getColorClasses(category.color || "blue", isSelected)}
            >
              <div className="flex flex-col items-center text-center">
                {IconComponent && (
                  <IconComponent
                    className={`w-8 h-8 mb-3 ${
                      isSelected
                        ? `text-${category.color || "blue"}-500`
                        : "text-gray-400"
                    }`}
                  />
                )}
                <h3
                  className={`font-medium capitalize ${
                    isSelected ? "text-gray-900" : "text-gray-600"
                  }`}
                >
                  {category.name}
                </h3>
              </div>
            </motion.button>
          );
        })}

        <AddCategoryCard onOpenModal={() => setIsModalOpen(true)} />
      </div>

      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCategory}
      />
    </div>
  );
}
