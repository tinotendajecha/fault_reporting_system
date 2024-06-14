"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "./stores/auth/store";

import {
  PiNumberSquareOneFill,
  PiNumberSquareTwoFill,
  PiNumberSquareThreeFill,
  PiNumberSquareFourFill,
  PiNumberSquareFiveFill,
} from "react-icons/pi";

export default function Home() {
  const auth = useAuthStore((state) => state);

  return (
    <div className="pl-20 pr-28 pt-36 landing-page text-white">
      <div className="mt-10 ml-5 flex justify-center items-center gap-5">
      <div>
          <Image
            src="https://media.licdn.com/dms/image/D4D0BAQGEp7PVt9RmVQ/company-logo_200_200/0/1687412683352/nitszw_logo?e=1726099200&v=beta&t=Vl55_gsPQjvXwWgNl3PUYyHfk9sSqCSjQ34BKx339Ks"
            alt="Company Logo"
            width={300}
            height={300}
            quality={100}
          />
        </div>

        <ul>
          <li className="flex items-center gap-2 mb-5">
            <PiNumberSquareOneFill size={30} />
            <span className="text-2xl">Seamless Network Fault Reporting</span>
          </li>

          <li className="flex items-center gap-2 mb-5">
            <PiNumberSquareTwoFill size={30} />
            <span className="text-2xl">Real-Time Network Fault Tracking</span>
          </li>

          <li className="flex items-center gap-2 mb-5">
            <PiNumberSquareThreeFill size={30} />
            <span className="text-2xl">
              Efficient Network Maintenance Management
            </span>
          </li>

          <li className="flex items-center gap-2 mb-5">
            <PiNumberSquareFourFill size={30} />
            <span className="text-2xl">
              Intuitive Network Support Interface
            </span>
          </li>
        </ul>

        
      </div>
    </div>
  );
}
