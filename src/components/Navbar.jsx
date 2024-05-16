'use client'
import React from 'react';
import { Btn } from './Btn';
import Link from 'next/link';
import { useAuthStore } from '../../stores/auth/store';
import { useRouter } from 'next/navigation';



const Navbar = () => {
  const auth = useAuthStore((state) => state) 
  const logout = useAuthStore((state) => state.logout) 

  const router = useRouter()

  const handleLogout = (e) => {
    e.preventDefault()

    console.log('Before logging out' + auth.id)
    
    // call logout action from store
    logout()
    router.push('/')
  }

  return (
    <div className='flex ml-10 items-center justify-between mt-10 mr-20 '>
        
        <h1 className='text-3xl'>Fault Reporting System</h1>

        {/* Buttons will render depending on user login status */}
        <div className='flex gap-5'>
          {!auth.name ? <Link href='/auth/login'><Btn button_name='Login' /></Link> : null}
          {!auth.name ? <Link href='/request-account'><Btn button_name='Request For Account From Help Desk'></Btn></Link> : null}
          {/* Make Logout button */}
          {auth.name ? <button className='bg-black text-white p-2 rounded-md' onClick={handleLogout}>Logout</button> : null}
          {/* Will add logout button here as well */}
        </div>
    </div>
  )
}

export default Navbar