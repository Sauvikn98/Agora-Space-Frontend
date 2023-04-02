import React from 'react'

function SpaceTabs({ tabs, currentTab, onTabClick }) {
    return (
        <div className='flex space-x-6 '>
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => onTabClick(tab)}
                    class={tab === currentTab ? 'text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700' : 'text-sm font-medium text-center text-gray-400 border-b border-gray-100 dark:text-gray-300 dark:border-gray-600'}>
                    {tab}
                </button>
            ))}
        </div>
    )
}

export default SpaceTabs