'use client'
import React, { useEffect, useState } from 'react';
import { Btn } from './Btn';
import Link from 'next/link';
import { useAuthStore } from '../app/stores/auth/store';
import { useRouter } from 'next/navigation';
import { CiLogin } from "react-icons/ci";
import { CiLogout } from 'react-icons/ci';


const Navbar = () => {
  const auth = useAuthStore((state) => state) 
  const logout = useAuthStore((state) => state.logout) 



  useEffect(() => {

  }, [auth.name])

  const router = useRouter()

  const handleLogout = (e) => {
    e.preventDefault()
    
    // call logout action from store
    logout()
    router.push('/')
  }

  return (
    <div className='flex pl-10 items-center justify-between pt-4 pb-4 pr-20 nav-bar text-white'>
      
        <h1 className='text-4xl'>Fault and Job Management System</h1>

        {/* Buttons will render depending on user login status */}
        <div className='flex gap-5'>
          {!auth.name  ? <Link href='/auth/login'>
            {/* <Btn button_name='login' /> */
            }
            <button className='flex justify-center items-center gap-1 bg-white text-black p-1.5 rounded-md'>Login <CiLogin /></button>
            </Link> : null}
          {/* {!auth.name ? <Link href='/request-account'><Btn button_name='Request For Account From Help Desk'></Btn></Link> : null} */}
          {/* Make Logout button */}
          
          {auth.name ? <Link href='/update-profile'><button className='flex justify-center items-center gap-1 bg-white text-black p-1.5 rounded-md'>Update Profile</button></Link> : null}

          {/* Will add logout button here as well */}
          {auth.name ? <button className='flex justify-center items-center gap-1 bg-white text-black p-1.5 rounded-md' onClick={handleLogout}><CiLogout/> Logout </button> : null}
        </div>
    </div>
  )
}

export default Navbar