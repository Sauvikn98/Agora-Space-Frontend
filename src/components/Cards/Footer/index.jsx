import React from 'react'
import Logo from "../../../assets/logo.png"

function Footer() {
  return (
    <div>

<footer class="w-full bg-white rounded-lg shadow dark:bg-gray-900 mt-6 mb-6">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a href="/" class="flex items-center mb-4 sm:mb-0">
                <img src={Logo} class="h-8 mr-3" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Agora Space</span>
            </a>
            
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/" class="hover:underline">Agora Space™</a>. All Rights Reserved.</span>
    </div>
</footer>



    </div>
  )
}

export default Footer