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
        <div className="rounded-lg py-10 bg-white hidden lg:block mr-5 mb-7 h-[70vh] mt-7 lg:mt-6 flex-wrap gap-4 space-y-6">
            {categories.map(category => (
                <div class=" flex w-full justify-center">
                    <div
                        data-te-chip-init
                        data-te-ripple-init
                        class="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] border border-[#3b71ca] bg-[#eceff1] bg-[transparent] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:border-[#3b71ca] hover:!shadow-none dark:text-neutral-200"
                        data-te-ripple-color="dark">
                        {category.name}

                        <span
                            data-te-chip-close
                            class="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-400 dark:hover:text-neutral-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="h-3 w-3">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </div>
                    
                </div>
            ))}
        </div>
    );
}


export default CategoryCard