import React, { useState } from 'react';

export const categories = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Gaming' },
    { id: 3, name: 'Sports' },
    { id: 4, name: 'Business' },
    { id: 5, name: 'Technology' },
    { id: 6, name: 'Art' },
    { id: 7, name: 'Anime' },
    { id: 8, name: 'Crypto' },
    { id: 9, name: 'Fashion' },
    { id: 10, name: 'Food and Drink' },
];

function CategoryCard({ handleCategorySelect }) {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
        handleCategorySelect(categoryName);
    };

    return (
        <div className="absolute lg:right-80 right-4 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            {categories.map(category => (
                <div key={category.id}>
                    <div className="flex items-center py-1 " role="none">
                        <div className={`font-medium text-gray-900 block w-full px-4 py-2 text-sm hover:bg-indigo-600 hover:text-white hover:cursor-pointer ${selectedCategory.includes(category.name) ? 'bg-indigo-600 text-white' : ''}`} role="menuitem" tabindex="-1" id={`menu-item-${category.id}`} onClick={() => handleCategoryClick(category.name)}>
                            {category.name}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CategoryCard;
