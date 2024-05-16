"use client";
import React from "react";
import UserInfo from "@/components/UserInfo";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import { useEffect } from "react";

import ReactLoading from "react-loading";
import { toast } from "react-toastify";

import Link from "next/link";
import axios from "axios";

import { useAuthStore } from "../../../../../stores/auth/store";



const page = () => {

  const auth = useAuthStore((state) => state)
  const userId = auth.id

  const [retrievedJobs, setRetrievedJobs] = useState([]) // change here
  const [isLoading, setIsLoading] = useState(true)
  const [deleteActionNotOccured, setDeleteActionNotOccured] = useState(true)

  useEffect(() => {
    getAllJobs()  // change here
  },[])


  useEffect(() => {

  }, isLoading)


  const getAllJobs = () => { // change here
    const api_call =axios.get(`https://x8ki-letl-twmt.n7.xano.io/api:hY2SbI8j/getFaultsByTechnicianId?technicianId=${userId}&fault_status=resolved`)
                    .then((res) => {
                      setRetrievedJobs(res.data)  // change here
                      setIsLoading(false) 
                    }).catch((err) => {
                      toast.error(err.response?.data?.message)
                    })
  }

  const handleDelete = (id) => {
    const deleteFault = axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:hY2SbI8j/faults/${id}`).then((res) => {
      toast.success("Fault deleted successfully")
      setIsLoading(true)
      getAllJobs()
    }).catch((err) => {
      toast.error(err.response?.data?.message)
    })
  }

  if (isLoading && !deleteActionNotOccured) {
    return (
      <>
        <div className="flex justify-center items-center min-h-96">
          <ReactLoading type="spin" color="gray" height={"4%"} width={"4%"} />
        </div>
      </>
    );
  }

  // if(!retrievedJobs){
  //   return(
  //     <div>
  //       <h1 className="text-center text-2xl mt-10">No completed jobs yet!</h1>
  //     </div>
  //   )
  // }


  return (
    <>
      <div className="columns flex ml-10">
        <div className="mt-10 flex items-start justify-between flex-col  pl-1 pr-2 h-48 lg:w-64">
          <UserInfo />

          <div className="flex flex-col ml-2 mt-5 ">
            <div className="flex flex-col ml-2 mt-5 ">
              <Link href="/technician/dashboard/assigned-jobs">
                <div className="text-xl p-3 w-56">
                  Jobs Assigned
                </div>
              </Link>
              <Link href="/technician/dashboard/completed-jobs">
                <div className="text-xl  p-3 w-56 bg-gray-200">Completed Jobs</div>
              </Link>
            </div>
          </div>
        </div>

        <div className="tables_column mt-10 pl-5  ml-2">
          <div className="flex gap-1 text-white ml-4">
            <span className="bg-black p-0.5 rounded text-xs">Pending 2</span>
            <span className="bg-black p-0.5 rounded text-xs">
              In Progress 4
            </span>
          </div>

          <div className="mt-4 ">
          <Table>
            <TableCaption>List of jobs</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left w-[200px]">Date</TableHead>
                  <TableHead className="text-left w-[200px]">
                    Job Number
                  </TableHead>
                  <TableHead className="text-left w-[200px]">
                    Job Description
                  </TableHead>
                  <TableHead className="text-left w-[200px]">
                    Customer
                  </TableHead>
                  <TableHead className="text-left w-[200px]">Status</TableHead>
                  <TableHead className="text-left w-[200px]">
                    Progress Notes
                  </TableHead>
                  <TableHead className="text-left w-[200px]">Deadline</TableHead>
                  <TableHead className="text-center w-[200px]">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {retrievedJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">
                    {new Date(job.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{job.id}</TableCell>
                    <TableCell className="font-medium">
                      {job.description}
                    </TableCell>
                    <TableCell>{job._customer_info[0].name}</TableCell>
                    <TableCell className="text-left">{job.status}</TableCell>
                    <TableCell className="text-left">{job.progress_notes}</TableCell>
                    <TableCell className="text-left">{job.deadline}</TableCell>
                    <TableCell className="">
                      <div className="flex gap-0.5">
                          <button onClick={() => handleDelete(job.id)} className="bg-black text-white p-1 rounded">
                            Delete
                          </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
