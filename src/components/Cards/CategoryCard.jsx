import { useState } from 'react';
import { CheckCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';

const categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
    { id: 4, name: 'Category 4' },
    { id: 5, name: 'Category 5' },
];

function CategoryCard() {
    const [selectedCategories, setSelectedCategories] = useState([]);

    function handleCategoryClick(categoryId) {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    }

    function getGradientClass(categoryId) {
        switch (categoryId) {
            case 1:
                return 'bg-gradient-to-r from-purple-500 via-purple-700 to-purple-900';
            case 2:
                return 'bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900';
            case 3:
                return 'bg-gradient-to-r from-teal-500 via-teal-700 to-teal-900';
            case 4:
                return 'bg-gradient-to-r from-orange-500 via-orange-700 to-orange-900';
            case 5:
                return 'bg-gradient-to-r from-green-500 via-green-700 to-green-900';
            default:
                return 'bg-gray-100';
        }
    }

    return (
        <div className="ml-7 mb-7 mt-7 lg:mt-0 flex flex-wrap gap-4">
            {categories.map(category => (
                <div
                    key={category.id}
                    className={`flex items-center p-2 border rounded-lg cursor-pointer ${getGradientClass(category.id)
                        }`}
                    onClick={() => handleCategoryClick(category.id)}
                >
                    {selectedCategories.includes(category.id) ? (
                        <CheckCircleIcon className="h-6 w-6 text-gray-300" />
                    ) : (
                        <PlusCircleIcon className="h-6 w-6 text-gray-100" />
                    )}
                    <h2 className="pl-2 pr-2 text-white">{category.name}</h2>
                </div>
            ))}
        </div>
    );
}


export default CategoryCard