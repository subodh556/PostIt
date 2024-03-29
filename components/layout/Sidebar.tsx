import React from 'react'
import {BsHouseFill , BsBellFill } from "react-icons/bs";
import {FaUser} from "react-icons/fa"
import { signOut } from 'next-auth/react';
import {BiLogOut} from "react-icons/bi"
import useCurrentUser from '@/hooks/useCurrentUser';
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';

import SidebarTweetButton from './SidebarTweetButton';




const Sidebar = () => {
    const {data:currentUser}=useCurrentUser();
    const items = [
        {
          icon: FaUser,
          label: 'Profile',
          href: `/users/${currentUser?.id}`,
          auth : true
        },
        {
          icon: BsHouseFill,
          label: 'Home',
          href: '/',
        },
        {
          icon: BsBellFill,
          label: 'Notifications',
          href: '/notifications',
          auth: true,
          alert: currentUser?.hasNotification
        },
        
    ]
  return (
    <div className="col-span-1 h-full pr-4 fixed md:pr-10">
        <div className="flex flex-col items-end">
            <div className="space-y-2 lg:w-[200px]">
                <SidebarLogo/>
                
                {items.map((item) => (
                    <SidebarItem
                        key={item.href}
                        href={item.href} 
                        icon={item.icon} 
                        label={item.label}
                        auth={item.auth}
                        alert={item.alert}
                    />
                ))}
                {currentUser && (<SidebarItem onClick={() => signOut()} icon={BiLogOut} label="Logout" />)}
                
                <SidebarTweetButton />
            </div>
        </div>
    </div>
  )
}

export default Sidebar