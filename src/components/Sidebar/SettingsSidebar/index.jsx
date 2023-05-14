import React from 'react'
import { Link } from 'react-router-dom'

function SettingsSidebar({handleActivePage, activePage}) {
    return (
        <div class=" mx-auto">
            <div class="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden dark:bg-slate-900 dark:border-gray-700">
                <div class="max-w-3xl mx-auto py-2">
                    <button type="button" class="flex justify-between gap-x-2 items-center w-full text-gray-500 hover:text-gray-600" data-hs-overlay="#docs-sidebar" aria-controls="docs-sidebar" aria-label="Toggle navigation">
                        <span class="text-sm">Toggle Navigation</span>
                        <svg class="w-5 h-5" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div id="docs-sidebar" class="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[60] w-80 bg-white border-r border-gray-200 py-10 px-8 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:top-0 lg:right-auto lg:bottom-0 lg:z-10 dark:scrollbar-y dark:bg-slate-900">
                <button type="button" class="ml-auto flex justify-end lg:hidden text-gray-500 hover:text-gray-600" data-hs-overlay="#docs-sidebar" aria-controls="docs-sidebar" aria-label="Toggle navigation">
                    <span class="sr-only">Toggle Navigation</span>
                    <svg class="w-5 h-5" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </button>
                <nav id="sidebar-nav" class="relative space-y-10">
                    <h5 class="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-200">Navbar Links</h5>
                    <ul class="ml-0.5 space-y-2 border-l-2 border-slate-100 dark:border-slate-800" data-hs-scrollspy="#scrollview">
                        <li onClick={()=> handleActivePage('account')}>
                            <Link to="/settings/account">
                                <h2 class={`block py-1 pl-4 -ml-px border-l-2 text-sm text-slate-700 ${activePage === 'account' ? 'border-indigo-500 text-indigo-500' : ''} hover:border-indigo-500 hover:text-indigo-500 dark:text-slate-400 dark:hover:text-slate-300 hs-scrollspy-active:font-medium hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400 active`}>Account</h2>
                            </Link>
                        </li>
                        <li onClick={() => handleActivePage('profile')}>
                            <Link to="/settings/profile">
                                <h2 class={`block py-1 pl-4 -ml-px border-l-2 text-sm text-slate-700 ${activePage === 'profile' ? 'border-indigo-500 text-indigo-500' : ''} hover:border-indigo-500 hover:text-indigo-500 dark:text-slate-400 dark:hover:text-slate-300 hs-scrollspy-active:font-medium hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400 active`}>Profile</h2>
                            </Link>
                        </li>
                        <li><a class="block py-1 pl-4 -ml-px border-l-2 border-transparent text-sm text-slate-700 hover:border-indigo-500 hover:text-indigo-500 dark:text-slate-400 dark:hover:text-slate-300 hs-scrollspy-active:font-medium hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400" href="#third">Safety and Privacy</a></li>
                        <li><a class="block py-1 pl-4 -ml-px border-l-2 border-transparent text-sm text-slate-700 hover:border-indigo-500 hover:text-indigo-500 dark:text-slate-400 dark:hover:text-slate-300 hs-scrollspy-active:font-medium hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400" href="#fourth">Feed Settings</a></li>
                        <li><a class="block py-1 pl-4 -ml-px border-l-2 border-transparent text-sm text-slate-700 hover:border-indigo-500 hover:text-indigo-500 dark:text-slate-400 dark:hover:text-slate-300 hs-scrollspy-active:font-medium hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400" href="#fifth">Emails</a></li>
                        <li><a class="block py-1 pl-4 -ml-px border-l-2 border-transparent text-sm text-slate-700 hover:border-indigo-500 hover:text-indigo-500 dark:text-slate-400 dark:hover:text-slate-300 hs-scrollspy-active:font-medium hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400" href="#sixth">Chat & Messaging</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default SettingsSidebar