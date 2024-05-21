"use client";
import React, { useEffect, useState } from "react";

import { UserIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import UserInfo from "@/components/UserInfo";

import ReactLoading from "react-loading";
import { toast } from "react-toastify";

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
import axios from "axios";

const page = () => {
  const [retrievedJobs, setRetrievedJobs] = useState(""); // change here
  const [isLoading, setIsLoading] = useState(true);

  const [deleteJob, setDeleteJob] = useState(false)

  useEffect(() => {
    getAllJobs(); // change here
    setDeleteJob(false)
  }, [deleteJob]);

  const getAllJobs = () => {
    // change here
    const api_call = axios
      .get(
        "https://x8ki-letl-twmt.n7.xano.io/api:hY2SbI8j/getFaultsByStatus?fault_status=resolved"
      )
      .then((res) => {
        setRetrievedJobs(res.data); // change here
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      });
  };

  const handleDeleteJob = async (id) => { 

      const api_call = axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:hY2SbI8j/faults/${id}`).then(
        (res) => {
          if(res.status === 200){
            toast.success("Job deleted successfully")
            setDeleteJob(true)
          }
        }
      ).catch(
        (err) => {
          toast.error(err.response?.data?.message)
        }
      )

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
    <>
      <div className="columns flex ml-10">
        <div className="mt-10 flex items-start justify-between flex-col  pl-1 pr-2  h-56 lg:w-64">
          <UserInfo />

          <div className="flex flex-col ml-2 mt-5 ">
            <Link href="/help-desk/faults">
              <div className="text-xl  p-3 w-56 ">Faults</div>
            </Link>

            <Link href="/help-desk/jobs">
              <div className="text-xl p-3 w-56">Pending Jobs</div>
            </Link>

            <Link href="/help-desk/users">
              <div className="text-xl p-3">Users</div>
            </Link>

            <Link href="/help-desk/jobs/completed-jobs">
              <div className="text-xl  p-3 w-56 bg-gray-200">Completed Jobs</div>
            </Link>
          </div>
        </div>

        <div className="tables_column mt-10 pl-5  ml-2">
          

          <div className="mt-4 ">
            <Table>
              <TableCaption>List of jobs</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left w-[200px]">Date</TableHead>
                  <TableHead className="text-left w-[200px]">
                    Job Description
                  </TableHead>
                  <TableHead className="text-left w-[200px]">
                    Customer
                  </TableHead>
                  <TableHead className="text-left w-[200px]">Status</TableHead>
                  <TableHead className="text-left w-[200px]">
                    Technician Name
                  </TableHead>
                  <TableHead className="text-left w-[200px]">
                    Progress Notes
                  </TableHead>
                  <TableHead className="text-center w-[200px]">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {retrievedJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium text-left">
                      {new Date(job.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium  text-left">
                      {job.description}
                    </TableCell>
                    <TableCell className="text-left">
                      {job._customer_info[0].name}
                    </TableCell>
                    <TableCell className="text-left">{job.status}</TableCell>
                    <TableCell className="text-left">
                      {job.__technician_info[0].name}
                    </TableCell>
                    <TableCell className="text-left">
                      {job.progress_notes}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex gap-0.5">
                        {/* <Link href="/help-desk/jobs/edit-job">
                          <button className="bg-black text-white p-1 rounded">
                            Edit
                          </button>
                        </Link> */}
                        <button onClick={() => handleDeleteJob(job.id)} className="bg-black text-white p-1 rounded">
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
