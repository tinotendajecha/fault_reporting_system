'use client'
import React from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Btn } from "@/components/Btn";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const page = () => {

  const router = useRouter()

  // Bind input fields to variables
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  

  const handleCreateAccountForUser = (e) => {
    e.preventDefault()

    if(!role){
      toast.error('Please assign role!')
    }
    if(!email || !fullName || !password){
      toast.error('Fill in all fields!')
    }

    const formData = {
      email, name:fullName, password, role
    }

    // API call - POST Request
    const api_call = axios.post('https://x8ki-letl-twmt.n7.xano.io/api:hY2SbI8j/auth/signup', formData)
    .then((res) => {
      console.log(res)
      if (res.status === 200){
        toast.success('Account created succesfully!')
        router.push('/help-desk/users/')
      }
    }).catch((err) => {
      toast.error(err.response?.data?.message)
    })
  }
  return (
    <>
      <form className="bg-white p-6 rounded-lg shadow-sm">
        <div>
          <h1 className="text-2xl font-bold mb-4">Add User</h1>
        </div>
  
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="johndoe@gmail.com"
              />
            </div>
          </div>
        </div>
  
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Full Name
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                required
                onChange={(e) => setFullName(e.target.value)}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="John Doe"
              />
            </div>
          </div>
        </div>
  
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Assign default password for user"
                autoComplete="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
  
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Role and Permissions
          </label>
          <select
            name="role"
            id="role"
            onChange={(e) => setRole(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Assign role</option>
            <option value="help_desk">Help Desk Agent</option>
            <option value="technician">Technician</option>
            <option value="customer">Customer</option>
          </select>
        </div>
  
        <div>
          <button
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            onClick={handleCreateAccountForUser}
          >
            Create Account
          </button>
        </div>
      </form>
    </>
  );
};

export default page;
