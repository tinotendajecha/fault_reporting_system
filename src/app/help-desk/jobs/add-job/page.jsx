"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";

const page = () => {
  const router = useRouter();

  const [jobName, setJobName] = useState("");
  const [jobDescription, setJobDescrition] = useState();
  const [priority, setPriority] = useState();
  const [deadline, setDeadline] = useState("");
  const [technicianId, setTechnicianId] = useState("");
  const [customerId, setCustomerId] = useState("");

  const [customerList, setCustomerList] = useState([]);
  const [technicianList, setTechnicianList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);

  const getAllCustomers = () => {
    const api_call = axios
      .get(
        `https://x8ki-letl-twmt.n7.xano.io/api:hY2SbI8j/getUserByRole?role=customer`
      )
      .then((res) => {
        setCustomerList(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      });
  };

  const getAllTechnicians = () => {
    const api_call = axios
      .get(
        `https://x8ki-letl-twmt.n7.xano.io/api:hY2SbI8j/getUserByRole?role=technician`
      )
      .then((res) => {
        setTechnicianList(res.data);
        setIsLoading2(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      });
  };

  useEffect(() => {
    getAllCustomers();
    getAllTechnicians();
  }, []);

  useEffect(() => {}, [isLoading2, isLoading]);

  const handleCreateJob = (e) => {
    e.preventDefault();

    console.log(`customer id: ${customerId}`)
    console.log(`Tech id: ${technicianId}`)

    if (!customerId || !Number.isInteger(customerId)) {
      toast.error("Please select customer for Job");
      return
    }

    if (!technicianId || !Number.isInteger(technicianId)) {
      toast.error("Please select Technician for Job");
      return
    }

    const formData = {
      fault_name: jobName,
      status: "open",
      priority: priority,
      description: jobDescription,
      deadline: deadline,
      customer_id: customerId,
      technician_id: technicianId,
      progress_notes: "Job in progress",
    };

    const api_call = axios
      .post(`https://x8ki-letl-twmt.n7.xano.io/api:hY2SbI8j/faults`, {
        ...formData,
      })
      .then((res) => {
        toast.success("Success!");
        router.push("/help-desk/jobs");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      });
  };

  if (isLoading && isLoading2) {
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
      {console.log(customerList)}
      {console.log(technicianList)}
      <form
        onSubmit={handleCreateJob}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto mt-5"
      >
        <div>
          <h1 className="text-2xl font-bold mb-4">Create Job</h1>
        </div>

        {/* Job Name */}
        <div className="mb-4">
          <label htmlFor="job" className="block text-gray-700 font-bold mb-2">
            Job Name
          </label>
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
            <input
              type="text"
              name="job"
              id="job"
              onChange={(e) => {
                setJobName(e.target.value);
              }}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-r-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Job Name"
            />
          </div>
        </div>

        {/* Job Description */}
        <div className="mb-4">
          <label
            htmlFor="jobDescription"
            className="block text-gray-700 font-bold mb-2"
          >
            Job Description
          </label>
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
            <textarea
              name="jobDescription"
              id="jobDescription"
              onChange={(e) => {
                setJobDescrition(e.target.value);
              }}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-r-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
        </div>

        {/* Job Priority */}
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

        <div>
          <label
            htmlFor="customer"
            className="block text-gray-700 font-bold mb-2"
          >
            Select Customer
          </label>

          <select
            name="customer"
            id="customer"
            onChange={(e) => setCustomerId(parseInt(e.target.value, 10))}
          >
            <option>Select Customer</option>
            {customerList.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="technician"
            className="block text-gray-700 font-bold mb-2"
          >
            Select Technician
          </label>

          <select
            name="technician"
            id="technician"
            onChange={(e) => setTechnicianId(parseInt(e.target.value, 10))}
          >
            <option>Select Technician</option>
            {technicianList.map((technician) => (
              <option key={technician.id} value={technician.id}>
                {technician.name}
              </option>
            ))}
          </select>
        </div>

        <button className="bg-black mt-2 text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
          Create Job
        </button>
      </form>
    </>
  );
};

export default page;
