import React from 'react';
import { UserIcon } from "@heroicons/react/20/solid";
import Link from 'next/link';

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

const faults = [
  {
    id: 1,
    description: "Office wifi not working",
    location: "IT Department",
    status: "pending",
  },
  {
    id: 1,
    description: "Office printer not working",
    location: "Office",
    status: "In Progress",
  },
];


const page = () => {
  return (
    <>
      <div className="columns flex ml-10">
        <div className="mt-10 flex items-start justify-between flex-col  pl-1 pr-2 h-48 lg:w-64">
          <div className="flex items-center ml-2 mt-2 ">
            <UserIcon className="mr-1.5 h-16 w-16 flex-shrink-0 text-gray-400 border" />
            <div className="ml-2 ">
              <h1 className="text-2xl">Tino</h1>
              <p>Customer</p>
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
            <div className='flex items-center justify-end mb-2'>
             <Link href='/customer/report-fault'> <button className='bg-black p-1.5 rounded-lg text-white'>Report Fault</button></Link>
            </div>
            <Table>
              <TableCaption>List of reported faults</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Description</TableHead>
                  <TableHead className="w-[200px]">Location</TableHead>
                  <TableHead className="text-left w-[200px]">Status</TableHead>
                  <TableHead className="text-left w-[200px]">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faults.map((fault) => (
                  <TableRow key={fault.id}>
                    <TableCell className="font-medium">
                      {fault.description}
                    </TableCell>
                    <TableCell>{fault.location}</TableCell>
                    <TableCell className="text-left">{fault.status}</TableCell>
                    <TableCell className="">
                      <div className="flex gap-0.5">
                        <Link href='/customer/edit-ticket'>
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
  )
}

export default page