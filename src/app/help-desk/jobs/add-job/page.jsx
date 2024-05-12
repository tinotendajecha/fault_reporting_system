'use client'
import React from "react";
import { useState } from "react";



const page = () => {

  const [jobName, setJobName] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [dateAssigned, setDateAssigned] = useState('')
  const [deadline, setDeadline] = useState('')
  const [technician, setTechnicianId] = useState('')
  const [customer, setCustomerId] = useState('')

  const handleAddJob = (e) => {
    // API Call to grab all technicians

    // API Call to grab all customers

    // API Call to POST to database
  }

  return (
    <>
      <form>
        <div>
          <h1>Assign Job To Worker</h1>
        </div>

        {/* Job Name */}
        <div>
          <label
            htmlFor="job"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Job Name
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
              <input
                type="text"
                name="job"
                id="job"
                onChange={(e) => {setJobName(e.target.value)}}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Fix Cafe Coffee Machine"
              />
            </div>
          </div>
        </div>

        {/* Job description */}
        <div>
          <label
            htmlFor="jobDescription"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Job Description
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
              <input
                type="textarea"
                name="jobDescription"
                id="jobDescription"
                onChange={(e) => {setJobDescription(e.target.value)}}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="johndoe@gmail.com"
              />
            </div>
          </div>
        </div>

        {/* Date Assigned */}
        <div>
        <label
            htmlFor="dateAssigned"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Date Assigned
          </label>

          <div>
            <input 
              id= 'dateAssigned'
              name='dateAssigned'
              className=""
              onChange={(e) => {setDateAssigned(e.target.value)}}
              type="date" />
          </div>
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
              onChange={(e) => {setDeadline(e.target.value)}}
              className=""
              type="date" />
          </div>
        </div>

        {/* Technician to Assign Technician */}
        <div>
        <label
            htmlFor="technician"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Technician To Assign
          </label>

          <div>
            <select name="technicianId" id="technicianId" onChange={(e) => setTechnicianId(e.target.value)}>
              <option value="1">Techncian 1</option>
              <option value="2">Technician 2</option>
              <option value="3">Technician 3</option>
            </select>
          </div>
        </div>

        {/* Customer to Assign Technician */}
        <div>
        <label
            htmlFor="customer"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Customer To Assign
          </label>

          <div>
            <select name="customerId" id="customerId" onChange={(e) => {setCustomerId(e.target.value)}}>
              <option value="1">Customer 1</option>
              <option value="2">Customer 2</option>
              <option value="3">Customer 3</option>
            </select>
          </div>
        </div>

        <button className="bg-black p-1.5 text-white mt-2 rounded-lg" onClick={handleAddJob}
        >Assign Job</button>
      </form>
    </>
  );
};

export default page;
