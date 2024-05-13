"use client";
import React, { useState } from "react";
import { UserIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useAuthStore } from "../../../../stores/auth/store";
import { toast } from "react-toastify";
import { useEffect } from "react";
import ReactLoading from "react-loading";

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
  const auth = useAuthStore((state) => state);
  const [customerFaults, setCustomerFaults] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllCustomerFaults();
  }, []);

  const getAllCustomerFaults = async (e) => {
    const customer_id = auth.id;

    const api_call = await axios
      .get(
        `https://x8ki-letl-twmt.n7.xano.io/api:hY2SbI8j/getCustomerFaults?customer_id=${customer_id}`
      )
      .then((res) => {
        setCustomerFaults(res.data);

        // set loading to false
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      });
  };

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
      {console.log(customerFaults[0])}
      <div className="columns flex ml-10">
        <div className="mt-10 flex items-start justify-between flex-col  pl-1 pr-2 h-48 lg:w-64">
          <div className="flex items-center ml-2 mt-2 ">
            <UserIcon className="mr-1.5 h-16 w-16 flex-shrink-0 text-gray-400 border" />
            <div className="ml-2 ">
              <h1 className="text-2xl">{auth.name.split(' ')[0]}</h1>
              <p>{auth.role}</p>
            </div>
          </div>

          <div className="flex flex-col ml-2 mt-5 ">
            <Link href="/customer/dashboard">
              <div className="text-xl  p-3 w-56 bg-gray-200">Open Tickets</div>
            </Link>

            <Link href="/customer/closed-tickets">
              <div className="text-xl p-3">Ticket History</div>
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
            <div className="flex items-center justify-end mb-2">
              <Link href="/customer/report-fault">
                {" "}
                <button className="bg-black p-1.5 rounded-lg text-white">
                  Report Fault
                </button>
              </Link>
            </div>
            <Table>
              <TableCaption>List of reported faults</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Fault Name</TableHead>
                  <TableHead className="w-[200px]">Description</TableHead>
                  <TableHead className="text-left w-[200px]">Status</TableHead>
                  <TableHead className="text-left w-[200px]">
                    Progress Notes
                  </TableHead>
                  <TableHead className="text-left w-[200px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerFaults.map((fault) => (
                  <TableRow key={fault.id}>
                    <TableCell>{fault.fault_name}</TableCell>
                    <TableCell>{fault.description}</TableCell>
                    <TableCell>
                      <span
                        className={`${
                          fault.status === "new"
                            ? "text-blue-500"
                            : fault.status === "resolved"
                            ? "text-green-500"
                            : "text-black"
                        }`}
                      >
                        {fault.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {!fault.progress_notes
                        ? "None Yet Check Later"
                        : fault.progress_notes}
                    </TableCell>
                    <TableCell className="">
                      <div className="flex gap-0.5">
                        <Link href="/customer/edit-ticket">
                          <button className="bg-black text-white p-1 rounded">
                            Edit
                          </button>
                        </Link>
                        <button className="bg-black text-white p-1 rounded">
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
