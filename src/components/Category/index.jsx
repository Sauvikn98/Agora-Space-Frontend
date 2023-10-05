import { Fragment, useState } from "react";
import { Disclosure } from "@headlessui/react";
import {
    ChevronUpIcon,
    ReceiptRefundIcon,
    QuestionMarkCircleIcon,
} from "@heroicons/react/outline";

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

export default function Category({ handleCategorySelect }) {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
        handleCategorySelect(categoryName);
    };
    return (
        <div className="flex w-96 flex-col space-y-4">
            <Disclosure>
                {({ open }) => (
                    <>
                        {categories.map((category) => (
                            <Disclosure.Button key={category.id} className="relative flex w-full items-center justify-between rounded-lg border border-muted-1 bg-layer-2 px-4 py-2 text-base font-semibold text-heading hover:bg-muted-1 focus:z-10 focus:outline-none focus:ring-2 focus:ring-heading/80 dark:border-0 dark:bg-layer-3">
                                <div onClick={() => handleCategoryClick(category.name)} className="flex items-center gap-2" >
                                    <ReceiptRefundIcon className="h-5 w-5" />
                                    {category.name}
                                </div>

                            </Disclosure.Button>
                        ))}
                    </>
                )}
            </Disclosure>
        </div>
    );
}
