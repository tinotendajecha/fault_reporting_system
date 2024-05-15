"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

const page = ({ params }) => {
  const router = useRouter();
  const id = params.faultId;
  const [retrievedFault, setRetrievedFault] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTechnicians, setIsLoadingTechnicians] = useState(true);

  const [technicians, setTechnicians] = useState([]);

  const [assignedTechnicianid, setAssignTechnician] = useState("");
  const[jobDescription, setJobDescription] = useState("");

  useEffect(() => {
    fetchFaultInformation();
    fetchAllTechnicians();
  }, []);

  useEffect(() => {}, [isLoadingTechnicians, isLoading]);

  const fetchFaultInformation = async (e) => {
    const api_call = axios
      .get(`https://x8ki-letl-twmt.n7.xano.io/api:hY2SbI8j/faults/${id}`)
      .then((res) => {
        setRetrievedFault(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      });
  };

  const fetchAllTechnicians = async (e) => {
    const api_call = axios
      .get(
        "https://x8ki-letl-twmt.n7.xano.io/api:hY2SbI8j/getUserByRole?role=technician"
      )
      .then((res) => {
        setTechnicians(res.data);
        setIsLoadingTechnicians(false);
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      });
  };

  const handleCreateJob = async(e) => {
    // Perform two processes
    // 1. Create a job endpoint
    // 2. Update status and write progress notes

    // Get form data
    const formData = {
      faults_id : id,
      technicians_id: assignedTechnicianid,
      job_description: jobDescription,
      status: 'assigned',
    }
    
    const createJobApiCall = axios.post('https://x8ki-letl-twmt.n7.xano.io/api:hY2SbI8j/jobs', formData)
                              .then((res) => {
                                if (res.status === 200){
                                  toast.success('Success, Technician will be notified!')
                                }
                              }).catch((err) => {
                                toast.error(err.response?.data?.message)
                              })
    
    const dataForUpdate = {
      status: 'open',
      progress_notes: 'Our technician are now working on it',
      technician_id: assignedTechnicianid,
      fault_name: retrievedFault.fault_name,
      priority: retrievedFault.priority,
      description: retrievedFault.description,
      deadline: retrievedFault.deadline,
      customer_id: retrievedFault.customer_id
    }
    
    const updateFaultStatus = axios.patch(`https://x8ki-letl-twmt.n7.xano.io/api:hY2SbI8j/faults/${id}`, dataForUpdate)
                              .then((res) => {
                                if(res.status == 200){
                                  toast.success('Job created succesfully!')
                                  router.push('/help-desk/jobs')
                                }
                              }).catch((err) => {
                                toast.error(err.response?.data?.message)
                              })
  }

  if (isLoading || isLoadingTechnicians) {
    return (
      <>
        <div className="flex justify-center items-center min-h-96">
          <ReactLoading type="spin" color="gray" height={"4%"} width={"4%"} />
        </div>
      </>
    );
  }

  return (
    <>
      <div>
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
                value={retrievedFault.fault_name}
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
                value={retrievedFault.description}
                className="block w-96 h-72 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm"
              ></textarea>
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
          <input type="text" value={retrievedFault.priority} />
        </div>

        {/* Deadline */}
        <div>
          <label
            htmlFor="deadline"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Deadline
          </label>

          <input type="text" value={retrievedFault.deadline} />
        </div>

        <div>
          <label
            htmlFor="jobDescription"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Job Description
          </label>
          <textarea
            name="jobDescription"
            id="jobDescription"
            onChange={(e) => setJobDescription(e.target.value)}
            className="block w-96 h-72 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="technicianId"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Assign Technician
          </label>
          <select
            name="technicianId"
            onChange={(e) => setAssignTechnician(e.target.value)}
            id="technicianId"
          >
            <option value="">Please Assign Technician</option>
            {technicians.map((technician) => (
              <option key={technician.id} value={technician.id}>
                {technician.name}
              </option>
            ))}
          </select>
        </div>

        <button
        onClick={handleCreateJob}
        className="bg-black p-1.5 text-white rounded-md mt-2">
          Create Job
        </button>
      </div>
    </>
  );
};

export default page;
