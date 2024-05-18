'use client'

import React from 'react';
import { useAuthStore } from '../../../../stores/auth/store';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';

import { redirect } from 'next/navigation';


const page = () => {
  const auth = useAuthStore((state) => state)
  const login = useAuthStore((state) => state.login)


  useEffect(() => {
    if (auth.name) {
      let name = auth.name
      name = name.split(' ')[0]

      toast.success(`Welcome ${name}!`);

      console.log(auth.role)

      if(auth.role === 'help_desk'){
        redirect('/help-desk/faults')
      }

      if (auth.role === 'technician'){
        redirect('/technician/dashboard/assigned-jobs')
      }

      if (auth.role === 'customer'){
        redirect('/customer/dashboard')
      }

    }
  }, [auth.name])

  // Define variables input variables
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (!email || !password) return;

    const auth_data = {
      email : email,
      password: password
    }

    // Make api call
    const api_call = axios.post('https://x8ki-letl-twmt.n7.xano.io/api:hY2SbI8j/auth/login', 
      {
        ...auth_data
      }
    ).then((response) => {
      const updated_res = response.data.user_information[0]
      const authToken = response.data.user_information.authToken

      // configure payload
      const payload = {
        id: updated_res.id,
        name: updated_res.name,
        email: updated_res.email,
        role: updated_res.role,
        authToken: authToken
      }

      // use login hook and Update global state with variables fron successful auth
      login(payload)

    }).catch((err) => {
      toast.error(err.response?.data?.message)
    })

  }


  return (
    <>  
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-6 mt-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST"  onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input 
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required className='w-full p-1.5 border-solid border-2 rounded-md outline-none'/>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
              <input 
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required className='w-full p-1.5 border-solid border-2 rounded-md outline-none'/>
              </div>
            </div> 

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Request Account From Organization Admin
            </a>
          </p>
        </div>
      </div>

    </>
  )
}

export default page