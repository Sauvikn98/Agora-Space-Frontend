import { useState } from 'react';
import { CheckCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';

const categories = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Health' },
    { id: 3, name: 'Entertainment' },
    { id: 4, name: 'Food' },
    { id: 5, name: 'Music' },
    { id: 6, name: 'Art & Craft' },
    { id: 7, name: 'Games' },

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
                return 'bg-purple-500';
            case 2:
                return 'bg-blue-500';
            case 3:
                return 'bg-teal-500';
            case 4:
                return 'bg-orange-500';
            case 5:
                return 'bg-green-500';
            case 6:
                return 'bg-yellow-500';
            case 7:
                return 'bg-violet-500';
            default:
                return 'bg-gray-100';
        }
    }

    return (
        <div className="lg:ml-7 ml-6 mb-7 mt-7 lg:mt-6 flex flex-wrap gap-4">
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