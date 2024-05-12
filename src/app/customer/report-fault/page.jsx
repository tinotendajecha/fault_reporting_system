"use client";
import React from "react";
import { useState } from "react";

const page = () => {
  const [faultName, setFaultName] = useState("");
  const [faultDescription, setFaultDescription] = useState('')
  const [priority, setPriority] = useState('')
  const [deadline, setDeadline] = useState('')

  const handleReportFault = (e) => {
    e.preventDefault()

    const formData = {
      fault_name: faultName,
      status: 'new',
      priority: priority,
      description: faultDescription,
      deadline: deadline
    }
  }



  return (
    <>
      <form action="">
        <div>
          <h1>Report Fault</h1>
        </div>

        {/* Fault Name */}
        <div>
          <label
            htmlFor="fault"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Fault Name
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
              <input
                type="text"
                name="fault"
                id="fault"
                onChange={(e) => {
                  setFaultName(e.target.value);
                }}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Office wifi not working"
              />
            </div>
          </div>
        </div>

        {/* Fault Description */}
        <div>
          <label
            htmlFor="faultDescription"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Fault Description
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
              <textarea 
                name="faultDescription"
                id="faultDescription"
                onChange={(e) => {
                  setFaultDescription(e.target.value);
                }}>
                </textarea>
            </div>
          </div>
        </div>

        {/* Fault Priority */}
        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Priority
          </label>
          <select name="priority" id="priority" onChange={(e) => {setPriority(e.target.value)}}>
            <option value="">Select Priority Level</option>
            <option value="low">Low</option>
            <option value="mid">Mid</option>
            <option value="high">High</option>
            <option value="very urgent">Urgent</option>
          </select>
        </div>

        {/* Deadline */}
        <div>
        <label
            htmlFor="deadline"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Deadline
          </label>

          <div>
            <input 
              id= 'deadline'
              name='deadline'
              className=""
              type="date" onChange={(e) => {setDeadline(e.target.value)}}/>
          </div>
        </div>

        <button onClick={handleReportFault} className="bg-black text-white p-1.5 mt-2 rounded-lg">Report Fault</button>
      </form>
    </>
  );
};

export default page;
