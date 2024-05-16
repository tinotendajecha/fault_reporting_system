'use client'
import React, { useEffect, useState } from "react";

import { UserIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import UserInfo from "@/components/UserInfo";
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

import ReactLoading from "react-loading";



const page = () => {

  const [newFaults, setNewFaults] = useState([])
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllNewFaults()
  }, [])

  const getAllNewFaults = (e) => {
    const api_call = axios.get(`https://x8ki-letl-twmt.n7.xano.io/api:hY2SbI8j/getFaultsByStatus?fault_status=new`)
    .then((res) => {
      setNewFaults(res.data)

      // console.log(res.data)
      // Stop the loading
      setIsLoading(false)

    }).catch((err) =>{
      toast.error(err.response?.data?.message);
    })
  }

  if (isloading) {
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
        <div className="mt-10 flex items-start justify-between flex-col  pl-1 pr-2 h-56 lg:w-64">
          {/* <div className="flex items-center ml-2 mt-2 ">
            <UserIcon className="mr-1.5 h-16 w-16 flex-shrink-0 text-gray-400 border" />
            <div className="ml-2 ">
              <h1 className="text-2xl">Joyce</h1>
              <p>Help desk</p>
            </div>
          </div> */}
          <UserInfo />


          <div className="flex flex-col ml-2 mt-5 ">
            <Link href="/help-desk/faults">
              <div className="text-xl  p-3 w-56 bg-gray-200">Faults</div>
            </Link>

            <Link href="/help-desk/jobs">
              <div className="text-xl p-3 w-56">Jobs</div>
            </Link>

            <Link href="/help-desk/users">
              <div className="text-xl p-3">Users</div>
            </Link>

            <Link href="/help-desk/jobs/completed-jobs">
              <div className="text-xl  p-3 w-56">Completed Jobs</div>
            </Link>
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
              <TableCaption>List of reported faults</TableCaption>
              <TableHeader>
                <TableRow>
                <TableHead className="w-[200px]">Fault Name</TableHead>
                  <TableHead className="w-[200px]">Description</TableHead>
                  <TableHead className="w-[200px]">Customer Name</TableHead>
                  <TableHead className="text-left w-[200px]">Status</TableHead>
                  {/* <TableHead className="w-[200px]">Assigned To</TableHead> */}
                  <TableHead className="text-left w-[200px]">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newFaults.map((fault) => (
                  <TableRow key={fault.id}>
                    <TableCell>{fault.fault_name}</TableCell>
                    <TableCell className="font-medium">
                      {fault.description}
                    </TableCell>
                    <TableCell>{fault._customer_info[0].name}</TableCell>
                    <TableCell>{fault.status}</TableCell>
                    {/* <TableCell className="text-left">{fault.assignedTo}</TableCell> */}
                    <TableCell className="">
                      <div className="flex gap-0.5">
                        <Link href={`/help-desk/assign-fault-to-technician/${fault.id}`}>
                          <button className="bg-black text-white p-1 rounded">
                            Assign Job
                          </button>
                        </Link>
                        <Link href='/help-desk/faults/delete-fault'>
                          <button className="bg-black text-white p-1 rounded">
                            Delete
                          </button>
                        </Link>
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
