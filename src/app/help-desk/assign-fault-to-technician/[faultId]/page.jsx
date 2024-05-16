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
  <div className="bg-white shadow-sm rounded-lg p-6 max-w-2xl mx-auto">
    <h1 className="text-2xl font-bold mb-4">Fault Details</h1>

    <div className="grid grid-cols-2 gap-6">
      <div>
        <label htmlFor="fault" className="text-gray-700 font-medium">
          Fault Name
        </label>
        <p className="text-gray-900 mt-1">{retrievedFault.fault_name}</p>
      </div>

      <div>
        <label htmlFor="priority" className="text-gray-700 font-medium">
          Priority
        </label>
        <p className="text-gray-900 mt-1">{retrievedFault.priority}</p>
      </div>

      <div>
        <label htmlFor="deadline" className="text-gray-700 font-medium">
          Deadline
        </label>
        <p className="text-gray-900 mt-1">{retrievedFault.deadline}</p>
      </div>

      <div>
        <label htmlFor="faultDescription" className="text-gray-700 font-medium">
          Fault Description
        </label>
        <p className="text-gray-900 mt-1 whitespace-pre-line">
          {retrievedFault.description}
        </p>
      </div>
    </div>

    <div className="mt-6">
      <label htmlFor="jobDescription" className="text-gray-700 font-medium">
        Job Description
      </label>
      <textarea
        name="jobDescription"
        id="jobDescription"
        onChange={(e) => setJobDescription(e.target.value)}
        className="block w-full h-32 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm"
      />
    </div>

    <div className="mt-6">
      <label htmlFor="technicianId" className="text-gray-700 font-medium">
        Assign Technician
      </label>
      <select
        name="technicianId"
        onChange={(e) => setAssignTechnician(e.target.value)}
        id="technicianId"
        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm"
      >
        <option value="">Please Assign Technician</option>
        {technicians.map((technician) => (
          <option key={technician.id} value={technician.id}>
            {technician.name}
          </option>
        ))}
      </select>
    </div>

    <div className="mt-6 flex justify-end">
      <button
        onClick={handleCreateJob}
        className="bg-black p-2 text-white rounded-md hover:bg-gray-800"
      >
        Create Job
      </button>
    </div>
  </div>
</>
  );
};

export default page;
