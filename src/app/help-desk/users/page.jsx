'use client'
import React, { useEffect, useState } from 'react'

import { UserIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import UserInfo from '@/components/UserInfo';
import { toast } from 'react-toastify';
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
import axios from 'axios';

const page = () => {

  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  

  useEffect(() => {
    getAllUsers()
  }, [])

  const getAllUsers = async() => {

    const api_call = axios.get('https://x8ki-letl-twmt.n7.xano.io/api:hY2SbI8j/user')
                      .then((res) => {
                        setUsers(res.data)
                        setIsLoading(false)
                      }).catch((err) => {
                        toast.error(err.response?.data?.message)
                      })
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
                    Email
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
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
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