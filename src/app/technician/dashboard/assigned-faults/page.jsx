import React from 'react'

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

// import { UserIcon } from 'lucide-react';
import { UserIcon } from "@heroicons/react/20/solid";
import Link from 'next/link';

const my_faults = [
  {
    id: 1,
    description: "Office wifi not working",
    location: "IT Department",
    reportedBy: "Jack Ryan",
    deadline: '01/06/2024',
    status: "In Progress",
  },
  {
    id: 2,
    description: "Connection to server not working",
    location: "IT Department",
    reportedBy: "Susan kalwoski",
    deadline: '01/05/2024',
    status: "In Progress",
  }
];

const page = () => {
  return (
    <>
        <div className="columns flex ml-10">
        <div className="mt-10 flex items-start justify-between flex-col  pl-1 pr-2 h-48 lg:w-64">
          <div className="flex items-center ml-2 mt-2 ">
            <UserIcon className="mr-1.5 h-16 w-16 flex-shrink-0 text-gray-400 border" />
            <div className="ml-2 ">
              <h1 className="text-2xl">Peter</h1>
              <p>Technician</p>
            </div>
          </div>

          <div className="flex flex-col ml-2 mt-5 ">
            <Link href="/technician/dashboard/assigned-faults">
              <div className="text-xl  p-3 w-56 bg-gray-200">Faults Assigned</div>
            </Link>

            <Link href="/technician/dashboard/assigned-jobs">
              <div className="text-xl p-3 w-56">Jobs Assigned</div>
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
                  <TableHead className="w-[200px]">Description</TableHead>
                  <TableHead className="w-[200px]">Location</TableHead>
                  <TableHead className="w-[200px]">Reported By</TableHead>
                  <TableHead className="text-left w-[200px]">Status</TableHead>
                  <TableHead className="text-left w-[200px]">Deadline</TableHead>
                  <TableHead className="text-left w-[200px]">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {my_faults.map((fault) => (
                  <TableRow key={fault.id}>
                    <TableCell className="font-medium">
                      {fault.description}
                    </TableCell>
                    <TableCell>{fault.location}</TableCell>
                    <TableCell>{fault.reportedBy}</TableCell>
                    <TableCell className="text-left">{fault.status}</TableCell>
                    <TableCell className="text-left">{fault.deadline}</TableCell>
                    <TableCell className="">
                      <div className="flex gap-0.5">
                        <Link href='/technician/update-fault'>
                          <button className="bg-black text-white p-1 rounded">
                            Update Fault
                          </button>
                        </Link>
                        {/* <Link href='/help-desk/faults/delete-fault'>
                          <button className="bg-black text-white p-1 rounded">
                            Delete
                          </button>
                        </Link> */}
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