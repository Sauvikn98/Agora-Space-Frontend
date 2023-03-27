import React, { useState } from 'react';

const categories = [
    { id: 1, name: 'Gaming' },
    { id: 2, name: 'Sports' },
    { id: 3, name: 'Business' },
    { id: 4, name: 'Technology' },
    { id: 5, name: 'Art' },
    { id: 6, name: 'Anime' },
    { id: 7, name: 'Crypto' },
    { id: 8, name: 'Fashion' },
    { id: 9, name: 'Food and Drink' },
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
                        <a href="#" class={`font-medium text-gray-900 block w-full px-4 py-2 text-sm hover:bg-indigo-600 hover:text-white ${selectedCategory.includes(category.name) ? 'bg-indigo-600 text-white' : ''}`} role="menuitem" tabindex="-1" id={`menu-item-${category.id}`} onClick={() => handleCategoryClick(category.name)}>
                            {category.name}
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CategoryCard;
