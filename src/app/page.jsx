'use client'
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from './stores/auth/store';

import { PiNumberSquareOneFill,
   PiNumberSquareTwoFill, 
  PiNumberSquareThreeFill,
   PiNumberSquareFourFill,
  PiNumberSquareFiveFill  } from "react-icons/pi";

export default function Home() {
  const auth = useAuthStore((state) => state) 

  return (
    <div className="pl-20 pr-28 pt-36 landing-page text-white">
        <div className="mt-10 ml-5">
          <ul>
            <li className="flex items-center gap-2 mb-5">
              <PiNumberSquareOneFill size={30}/>
              <span className="text-2xl">Simplified Fault Reporting</span>
            </li>

          <li className="flex items-center gap-2 mb-5">
            <PiNumberSquareTwoFill size={30} />
            <span className="text-2xl">Automatic Technician Assignment</span>
          </li>

          <li className="flex items-center gap-2 mb-5">
            <PiNumberSquareThreeFill size={30}/>
            <span className="text-2xl">A Real-Time Fault Tracking</span>
          </li>
          
          <li className="flex items-center gap-2 mb-5">
            <PiNumberSquareFourFill size={30}/>
            <span className="text-2xl">Efficient Job Management</span>
          </li>

          <li className="flex items-center gap-2 mb-5">
            <PiNumberSquareFiveFill size={30}/>
            <span className="text-2xl">User-Friendly Interface</span>
          </li>
          
          </ul>
        </div>
      </div>
  );
}
