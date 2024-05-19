"use client";
import React from "react";
import { useState } from "react";
import { useAuthStore } from "../../stores/auth/store";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const page = () => {

  const auth = useAuthStore((state) => state)
  const router = useRouter()

  const [faultName, setFaultName] = useState("");
  const [faultDescription, setFaultDescription] = useState('')
  const [priority, setPriority] = useState('')
  const [deadline, setDeadline] = useState('')

  const handleReportFault = async (e) => {
    e.preventDefault()

    // Check for empty inputs
    if(!faultName || !faultDescription || !priority || !deadline){
      toast.error('Please fill in all fields!')
    }

    // Grab the current customer id
    const customer_id = auth.id

    const formData = {
      fault_name: faultName,
      status: 'new',
      priority: priority,
      description: faultDescription,
      deadline: deadline,
      customer_id
    }

    const api_call = await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:hY2SbI8j/faults', {
      ...formData
    })
    .then((res) => {
      if (res.status === 200){
        toast.success('Fault succesfully submitted!')
        router.push('/customer/dashboard')
      }

      // Send help desk email about fault
    }).catch((err) => {
      toast.error(err.response?.data?.message)
    })
  }

  return (
    <>
      <form action="" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto">
        <div>
          <h1 className="text-2xl font-bold mb-4">Report Fault</h1>
        </div>
  
        {/* Fault Name */}
        <div className="mb-4">
          <label
            htmlFor="fault"
            className="block text-gray-700 font-bold mb-2"
          >
            Fault Name
          </label>
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              
            </span>
            <input
              type="text"
              name="fault"
              id="fault"
              onChange={(e) => {
                setFaultName(e.target.value);
              }}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-r-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Office wifi not working"
            />
          </div>
        </div>
  
        {/* Fault Description */}
        <div className="mb-4">
          <label
            htmlFor="faultDescription"
            className="block text-gray-700 font-bold mb-2"
          >
            Fault Description
          </label>
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              
            </span>
            <textarea
              name="faultDescription"
              id="faultDescription"
              onChange={(e) => {
                setFaultDescription(e.target.value);
              }}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-r-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
            </textarea>
          </div>
        </div>
  
        {/* Fault Priority */}
        <div className="mb-4">
          <label
            htmlFor="priority"
            className="block text-gray-700 font-bold mb-2"
          >
            Priority
          </label>
          <select
            name="priority"
            id="priority"
            onChange={(e) => {
              setPriority(e.target.value);
            }}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Priority Level</option>
            <option value="low">Low</option>
            <option value="mid">Mid</option>
            <option value="high">High</option>
            <option value="very urgent">Urgent</option>
          </select>
        </div>
  
        {/* Deadline */}
        <div className="mb-4">
          <label
            htmlFor="deadline"
            className="block text-gray-700 font-bold mb-2"
          >
            Deadline
          </label>
          <div>
            <input
              id="deadline"
              name="deadline"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="date"
              onChange={(e) => {
                setDeadline(e.target.value);
              }}
            />
          </div>
        </div>
  
        <button
          onClick={handleReportFault}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Report Fault
        </button>
      </form>
    </>
  );
};

export default page;
