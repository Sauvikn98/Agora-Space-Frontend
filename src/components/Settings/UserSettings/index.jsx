import React, {useState} from 'react'
import SettingsSidebar from '../../Sidebar/SettingsSidebar'
import ProfileSettings from './ProfileSettings'
import AccountSettings from './AccountSettings'

function UserSettings() {
  const [activePage, setActivePage] = useState('account');

  const handleActivePage = (page) => {
    setActivePage(page);
  };

  return (
    <>
      <SettingsSidebar handleActivePage = {handleActivePage} activePage = {activePage}/>
      <div class="w-full lg:pl-[20rem]">
        <div class="">
          <div>
            <div id="scrollview" class="mt-10 ml-10 space-y-10 md:space-y-16">
              <div id="first" class="scroll-mt-24 min-h-[25rem]">
                <h2 className="text-lg font-bold">Account Settings</h2>
                <p className="text-sm text-gray-500">Update your account information and preferences</p>
            
                  {activePage === 'account' && <AccountSettings />}
                  {activePage === 'profile' && <ProfileSettings/>}
                 
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserSettings