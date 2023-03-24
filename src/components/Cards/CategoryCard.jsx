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
        <div className="absolute lg:right-80 right-4 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            {categories.map(category => (
               <div>
               <div class="py-1" role="none">
                
                 <a href="#" class="font-medium text-gray-900 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">{category.name}</a>
 
               </div>
             </div>
            ))}
        </div>
    );
}


export default CategoryCard