import React from 'react'

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

const users = [
  {
    id: 1,
    name: "Tinotenda J",
    expertise: "Software Developer",
    user_role: "Technician"
  },

  {
    id: 2,
    name: "John Doe",
    expertise: "Hardware Engineer",
    user_role: "User"
  },
  {
    id: 3,
    name: "Jane Doe",
    expertise: "Help Desk",
    user_role: "Help Desk"
  }
];

const page = () => {
  return (
    <>
      <div className="columns flex ml-10">
        <div className="mt-10 flex items-start justify-between flex-col  pl-1 pr-2  h-56 lg:w-64">
          <div className="flex items-center ml-2 mt-2 ">
            <UserIcon className="mr-1.5 h-16 w-16 flex-shrink-0 text-gray-400 border" />
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
              <div className="text-xl p-3 w-56 ">Jobs</div>
            </Link>

            <Link href="/help-desk/users">
              <div className="text-xl p-3 bg-gray-200">Users</div>
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
             <Link href='/help-desk/users/add-user'> <button>Add User</button></Link>
            </div>
          </div>

          <div className="mt-4 ">
            <Table>
              <TableCaption>List of jobs</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left w-[200px]">
                    user Name
                  </TableHead>
                  <TableHead className="text-left w-[200px]">
                    Expertise
                  </TableHead>
                  <TableHead className="text-left w-[200px]">
                    Role
                  </TableHead>
                  <TableHead className="text-left w-[200px]">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium text-left">
                      {user.name}
                    </TableCell>
                    <TableCell>{user.expertise}</TableCell>
                    <TableCell>{user.user_role}</TableCell>
                    <TableCell className="text-left">
                      <div className="flex items-center gap-0.5">
                        <Link href='/help-desk/users/edit-user'>
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