import React from "react";

import { UserIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

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

const jobs = [
  {
    id: 1,
    date: "01/01/2024",
    job_number: "1",
    description: "Fix Cafe coffee machine",
    customer: "Cafe People",
    user: "John Doe",
    status: "pending",
    comments: "Machine is not turning on. Needs to be fixed ASAP.",
  },
  {
    id: 2,
    date: "01/01/2024",
    job_number: "2",
    description: "Fix Office wifi",
    customer: "Office people",
    user: "Jane Doe",
    status: "In Progress",
    comments: "Wifi is not working. Needs to be fixed ASAP.",
  },
  {
    id: 3,
    date: "01/01/2024",
    job_number: "3",
    description: "Fix Office wifi",
    customer: "Office people",
    user: "Jane Doe",
    status: "In Progress",
    comments: "Wifi is not working. Needs to be fixed ASAP.",
  },
];

const page = () => {
  return (
    <>
      <div className="columns flex ml-10">
        <div className="mt-10 flex items-start justify-between flex-col  pl-1 pr-2  h-56 lg:w-64">
          <div className="flex items-center ml-2 mt-2 ">
            <UserIcon className="mr-1.5 h-16 w-16 flex-shrink-0 text-gray-400 border"/>
            <div className="ml-2 ">
              <h1 className="text-2xl">Joyce</h1>
              <p>Help desk</p>
            </div>
          </div>

          <div className="flex flex-col ml-2 mt-5 ">
            <Link href="/help-desk/faults">
              <div className="text-xl  p-3 w-56 ">Faults</div>
            </Link>

            <Link href="/help-desk/jobs">
              <div className="text-xl p-3 w-56 bg-gray-200">Jobs</div>
            </Link>

            <Link href="/help-desk/users">
              <div className="text-xl p-3">Users</div>
            </Link>
          </div>
        </div>

        <div className="tables_column mt-10 pl-5  ml-2">
          <div className=" flex items-center justify-between">
            <div className="flex gap-1 text-white ml-4">
              <span className="bg-black p-0.5 rounded text-xs">Pending 2</span>
              <span className="bg-black p-0.5 rounded text-xs">
                In Progress 4
              </span>
            </div>

            <div className="mr-16 bg-green-600 text-white p-1.5 rounded">
                <Link href='/help-desk/jobs/add-job'>
                  <button>Add Job</button>
                </Link>
            </div>
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
                  <TableHead className="text-left w-[200px]">user</TableHead>
                  <TableHead className="text-left w-[200px]">Status</TableHead>
                  <TableHead className="text-left w-[200px]">
                    Comments
                  </TableHead>
                  <TableHead className="text-center w-[200px]">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium text-left">
                      {job.date}
                    </TableCell>
                    <TableCell>{job.job_number}</TableCell>
                    <TableCell className="font-medium  text-left">
                      {job.description}
                    </TableCell>
                    <TableCell className="text-left">{job.customer}</TableCell>
                    <TableCell className="text-left">{job.user}</TableCell>
                    <TableCell className="text-left">{job.status}</TableCell>
                    <TableCell className="text-left">{job.comments}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex gap-0.5">
                        <Link href="/help-desk/jobs/edit-job">
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
