'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import { useRouter } from "next/navigation";

const page = ({ params }) => {
  const router = useRouter()
  // get id from router
  const id = params.jobId;

  const [retrievedFault, setRetrievedFault] = useState("");
  const [isLoading, setIsLoading] = useState("true");

  const [technicianNotes, setTechnicianNotes] = useState("");

  useEffect(() => {
    getFaultInfo();
  }, []);

  const getFaultInfo = async () => {
    const api_Call = axios
      .get(`https://x8ki-letl-twmt.n7.xano.io/api:hY2SbI8j/faults/${id}`)
      .then((res) => {
        setRetrievedFault(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      });
  };

  const handleCompleteJob = async () => { 
   const updateData = {
      // technicianNotes: technicianNotes,
      status: "resolved",
      fault_name: retrievedFault.fault_name,
      pritority: retrievedFault.priority,
      description: retrievedFault.description,
      deadline: retrievedFault.deadline,
      customer_id: retrievedFault.customer_id,
      technician_id: retrievedFault.technician_id,
      progress_notes: technicianNotes
   }

   const api_call = axios.patch(`https://x8ki-letl-twmt.n7.xano.io/api:hY2SbI8j/faults/${id}`, updateData)
                  .then((res) => {
                    if(res.status === 200){
                      toast.success("Job Completed Successfully");
                      router.push('/technician/dashboard/assigned-jobs')
                    }
                  })
  }

  if (isLoading) {
    return (
      <>
        <div className="flex justify-center items-center min-h-96">
          <ReactLoading type="spin" color="gray" height={"4%"} width={"4%"} />
        </div>
      </>
    );
  }

  return (
    <div>
    <div className="fault-details-page bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Fault Details</h1>
      <div className="fault-details-container grid grid-cols-2 gap-4">
        <div className="fault-detail-row">
          <div className="fault-detail-label text-gray-500 font-medium">
            Date:
          </div>
          <div className="fault-detail-value text-gray-700">
            {new Date(retrievedFault.created_at).toLocaleDateString()}
          </div>
        </div>
        <div className="fault-detail-row">
          <div className="fault-detail-label text-gray-500 font-medium">
            Job Description:
          </div>
          <div className="fault-detail-value text-gray-700">
            {retrievedFault.description}
          </div>
        </div>
        <div className="fault-detail-row">
          <div className="fault-detail-label text-gray-500 font-medium">
            Customer:
          </div>
          <div className="fault-detail-value text-gray-700">
            {retrievedFault._customer_info[0].name}
          </div>
        </div>
        <div className="fault-detail-row">
          <div className="fault-detail-label text-gray-500 font-medium">
            Status:
          </div>
          <div className="fault-detail-value text-gray-700">
            {retrievedFault.status}
          </div>
        </div>
        <div className="fault-detail-row">
          <div className="fault-detail-label text-gray-500 font-medium">
            Progress Notes:
          </div>
          <div className="fault-detail-value text-gray-700">
            {retrievedFault.progress_notes}
          </div>
        </div>
        <div className="fault-detail-row">
          <div className="fault-detail-label text-gray-500 font-medium">
            Deadline:
          </div>
          <div className="fault-detail-value text-gray-700">
            {new Date(retrievedFault.deadline).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Update Job Status</h1>
      <div className="mb-4">
        <label
          htmlFor="technicianNotes"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Technician Notes
        </label>
        <textarea
          id="technicianNotes"
          name="technicianNotes"
          rows="3"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Write brief information for the customer"
          value={technicianNotes}
          onChange={(e) => setTechnicianNotes(e.target.value)}
        ></textarea>
        <button
        className="bg-black p-1.5 rounded-md text-white mt-2"
        onClick={handleCompleteJob}
        >Complete Job</button>
      </div>
    </div>
  </div>
  );
};

export default page;
