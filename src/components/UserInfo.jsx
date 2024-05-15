import React from 'react'
import { useAuthStore } from '../../stores/auth/store';
import { UserIcon } from "@heroicons/react/20/solid";

const UserInfo = () => {

const auth = useAuthStore((state) => state);

  return (
    <>
        <div className="flex items-center ml-2 mt-2 ">
            <UserIcon className="mr-1.5 h-16 w-16 flex-shrink-0 text-gray-400 border" />
            <div className="ml-2 ">
              <h1 className="text-2xl">{auth.name.split(' ')[0]}</h1>
              <p>{auth.role}</p>
            </div>
        </div>
    </>
  )
}

export default UserInfo;