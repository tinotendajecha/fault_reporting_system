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

const my_jobs = [
    {
      id: 1,
      description: "Service the HR departments computers",
      location: "IT Department",
      deadline: '01/06/2024',
      status: "In Progress",
    },
    {
      id: 2,
      description: "Print flyers for advertising",
      location: "Media Department",
      deadline: '01/05/2024',
      status: "Backlog",
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
              <div className="text-xl  p-3 w-56">Faults Assigned</div>
            </Link>

            <Link href="/technician/dashboard/assigned-jobs">
              <div className="text-xl p-3 w-56 bg-gray-200">Jobs Assigned</div>
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
                  <TableHead className="text-left w-[200px]">Status</TableHead>
                  <TableHead className="text-left w-[200px]">Deadline</TableHead>
                  <TableHead className="text-left w-[200px]">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {my_jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">
                      {job.description}
                    </TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell className="text-left">{job.status}</TableCell>
                    <TableCell className="text-left">{job.deadline}</TableCell>
                    <TableCell className="">
                      <div className="flex gap-0.5">
                        <Link href='/technician/update-job'>
                          <button className="bg-black text-white p-1 rounded">
                            Update Job
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