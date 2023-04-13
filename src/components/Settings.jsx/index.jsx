import React from 'react'
import SettingsSidebar from '../Sidebar/SettingsSidebar'
import ProfileSettings from './ProfileSettings'
import AccountSettings from './AccountSettings'

function Settings() {
  return (
    <>
      <SettingsSidebar />
      <div class="w-full lg:pl-[20rem]">
        <div class="">
          <div>
            <div id="scrollview" class="mt-10 ml-10 space-y-10 md:space-y-16">
              <div id="first" class="scroll-mt-24 min-h-[25rem]">
                <h2 className="text-lg font-bold">Account Settings</h2>
                <p className="text-sm text-gray-500">Update your account information and preferences</p>
                <AccountSettings />
              </div>

              <div id="second" class="scroll-mt-24 min-h-[25rem]">
                <h2 className="text-lg font-bold">Profile Settings</h2>
                <p className="text-sm text-gray-500">Update your Personal Information</p>
                <ProfileSettings />
              </div>

              <div id="third" class="scroll-mt-24 min-h-[25rem]">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-white">Third section</h2>
              </div>

              <div id="fourth" class="scroll-mt-24 min-h-[25rem]">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-white">Fourth section</h2>
              </div>

              <div id="fifth" class="scroll-mt-24 min-h-[25rem]">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-white">Fifth section</h2>
              </div>

              <div id="sixth" class="scroll-mt-24 min-h-[25rem]">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-white">Sixth section</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings