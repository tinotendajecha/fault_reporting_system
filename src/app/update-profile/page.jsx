'use client'
import React, { useState } from "react";
import { useAuthStore } from "../stores/auth/store";
import axios from "axios";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import {useRouter} from "next/navigation";

const page = () => {
    
    const auth = useAuthStore((state) => state);
    const [updatedPassword, setUpdatePassword] = useState('')

    const loggedInUserId = auth.id
    const router = useRouter()

    const handleUpdatePassword = () => {
      // e.preventDefault()
      const data = {
        name: auth.name,
        email: auth.email,
        role: auth.role,
        password: updatedPassword
      }
        const api_call = axios.patch(`https://x8ki-letl-twmt.n7.xano.io/api:hY2SbI8j/user/${loggedInUserId}`, data)
        .then((res) => {
          console.log(res)
            if(res.status === 200){
                toast.success('Password updated succesfully')
                if(auth.role === 'customer'){
                    // redirect('/customer/dashboard')
                    router.push('/customer/dashboard')
                }

                if (auth.role === 'technician'){
                    // redirect('/technician/dashboard/assigned-jobs')
                    router.push('/technician/dashboard/assigned-jobs')
                }

                if (auth.role === 'help_desk'){
                    // redirect('/help-desk/faults')
                    router.push('/help-desk/faults')
                }
            }
        }).catch((err) => {
            toast.error(err.response?.data?.message)
        })
    }
    

    return (
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
  
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                value={auth.email}
                type="email"
                className="w-full p-2 border-2 border-gray-300 rounded-md outline-none focus:border-blue-500"
              />
            </div>
          </div>
  
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                required
                onChange={(e) => setUpdatePassword(e.target.value)}
                className="w-full p-2 border-2 border-gray-300 rounded-md outline-none focus:border-blue-500"
              />
            </div>
          </div>
  
          <button
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            onClick={handleUpdatePassword}
          >
            Update Password
          </button>
        </div>
      </div>
    );
};

export default page;
