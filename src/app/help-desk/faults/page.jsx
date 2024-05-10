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

const faults = [
  {
    id: 1,
    description: "Office wifi not working",
    location: "IT Department",
    reportedBy: "Jack Ryan",
    status: "pending",
  },
  {
    id: 2,
    description: "Cafe coffee machine is not turning on",
    location: "Cafeteria",
    reportedBy: "Sam Bankman",
    status: "In Progress",
  },
];

const page = () => {
  return (
    <>
      <div className="columns flex ml-10">
        <div className="mt-10 flex items-start justify-between flex-col  pl-1 pr-2 h-56 lg:w-64">
          <div className="flex items-center ml-2 mt-2 ">
            <UserIcon className="mr-1.5 h-16 w-16 flex-shrink-0 text-gray-400 border" />
            <div className="ml-2 ">
              <h1 className="text-2xl">Joyce</h1>
              <p>Help desk</p>
            </div>
          </div>

          <div className="flex flex-col ml-2 mt-5 ">
            <Link href="/help-desk/faults">
              <div className="text-xl  p-3 w-56 bg-gray-200">Faults</div>
            </Link>

            <Link href="/help-desk/jobs">
              <div className="text-xl p-3">Jobs</div>
            </Link>

            <Link href="/help-desk/workers">
              <div className="text-xl p-3">Workers</div>
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
                    <TableCell>{fault.reportedBy}</TableCell>
                    <TableCell className="text-left">{fault.status}</TableCell>
                    <TableCell className="">
                      <div className="flex gap-0.5">
                        <Link href='/help-desk/faults/assign-worker'>
                          <button className="bg-black text-white p-1 rounded">
                            Assign
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
