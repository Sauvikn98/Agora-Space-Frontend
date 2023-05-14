import React from 'react'
import { GoogleLogin, googleLogout } from '@react-oauth/google'

function AccountSettings() {
    return (
        <div>
            <div className="grid grid-cols-2 mt-6">
                <div class="flex flex-col space-y-4 ">
                    <div class="flex justify-between border-b border-gray-300 pb-4">
                        <div class="text-gray-700 font-medium">Email</div>
                        <div>
                            <div class="flex mr-2">sauviknath10@gmail.com
                                <h1 className='text-gray-500 ml-2'>Primary Email</h1>
                            </div>
                            <button class="text-blue-500 hover:text-blue-700 focus:outline-none focus:text-blue-700">Add Another Email Address</button>
                        </div>
                    </div>
                    <div class="flex justify-between border-b border-gray-300 pb-4">
                        <div class="text-gray-700 font-medium">Password</div>
                        <div>
                            <button class="text-blue-500 hover:text-blue-700 focus:outline-none focus:text-blue-700">Change Password</button>

                        </div>
                    </div>
                    <div class="flex justify-between items-center border-b border-gray-300 pb-4">
                        <div class="text-gray-700 font-medium">Country of residence</div>
                        <select class="border border-gray-400 rounded py-1 px-2">
                            <option>Select Country</option>
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Australia</option>
                            <option>United Kingdom</option>
                        </select>
                    </div>
                    <div class="flex justify-between items-center border-b border-gray-300 pb-4">
                        <div class="text-gray-700 font-medium">Logout</div>
                        <button class="text-blue-500 hover:text-blue-700 focus:outline-none focus:text-blue-700">Logout</button>
                    </div>
                    <div class="flex justify-between items-center border-b border-gray-300 pb-4">
                        <div class="text-gray-700 font-medium">Log out of all other browsers</div>
                        <button class="text-blue-500 hover:text-blue-700 focus:outline-none focus:text-blue-700">Logout</button>
                    </div>
                    <div class="flex justify-between items-center border-b border-gray-300 pb-4">
                        <div class="text-gray-700 font-medium">Login security</div>
                        <label class="flex items-center">
                            <input type="checkbox" class="form-checkbox mr-2" checked />
                            Require email verification
                        </label>
                    </div>
                    <div class=" flex justify-between items-center border-b border-gray-300 pb-4 pt-10">
                        <div class="text-gray-700 font-medium">Connected Accounts & Contacts</div>
                        <button class="text-blue-500 hover:text-blue-700 focus:outline-none focus:text-blue-700">Learn more</button>
                    </div>
                    <div class="flex justify-between border-b border-gray-300 pb-4">
                        <div className='flex justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className='h-4 w-4' preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" id="google"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path></svg>
                            <div class="text-gray-700 font-medium ml-4">Google</div>
                        </div>
                        <div>
                            <div>
                                <GoogleLogin
                                onSuccess={(response) => console.log(response)}
                                onError={()=>console.log('Error')}
                                />
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between border-b border-gray-300 pb-4">
                        <div className='flex justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className='h-4 w-4' viewBox="0 0 16 16" id="twitter"><path fill="#03A9F4" d="M16 3.539a6.839 6.839 0 0 1-1.89.518 3.262 3.262 0 0 0 1.443-1.813 6.555 6.555 0 0 1-2.08.794 3.28 3.28 0 0 0-5.674 2.243c0 .26.022.51.076.748a9.284 9.284 0 0 1-6.761-3.431 3.285 3.285 0 0 0 1.008 4.384A3.24 3.24 0 0 1 .64 6.578v.036a3.295 3.295 0 0 0 2.628 3.223 3.274 3.274 0 0 1-.86.108 2.9 2.9 0 0 1-.621-.056 3.311 3.311 0 0 0 3.065 2.285 6.59 6.59 0 0 1-4.067 1.399c-.269 0-.527-.012-.785-.045A9.234 9.234 0 0 0 5.032 15c6.036 0 9.336-5 9.336-9.334 0-.145-.005-.285-.012-.424A6.544 6.544 0 0 0 16 3.539z"></path></svg>
                            <div class="text-gray-700 font-medium ml-4">Twitter</div>
                        </div>
                        <div>
                            <div>
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Connect Twitter Account</button>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between border-b border-gray-300 pb-4">
                        <div className='flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='h-4 w-4' data-name="Ebene 1" viewBox="0 0 1024 1024" id="facebook-logo-2019"><path fill="#1877f2" d="M1024,512C1024,229.23016,794.76978,0,512,0S0,229.23016,0,512c0,255.554,187.231,467.37012,432,505.77777V660H302V512H432V399.2C432,270.87982,508.43854,200,625.38922,200,681.40765,200,740,210,740,210V336H675.43713C611.83508,336,592,375.46667,592,415.95728V512H734L711.3,660H592v357.77777C836.769,979.37012,1024,767.554,1024,512Z"></path><path fill="#fff" d="M711.3,660,734,512H592V415.95728C592,375.46667,611.83508,336,675.43713,336H740V210s-58.59235-10-114.61078-10C508.43854,200,432,270.87982,432,399.2V512H302V660H432v357.77777a517.39619,517.39619,0,0,0,160,0V660Z"></path></svg>
                            <div class="text-gray-700 font-medium ml-4">Facebok</div>
                        </div>
                        <div>
                            <div>
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Connect Facebook Account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountSettings