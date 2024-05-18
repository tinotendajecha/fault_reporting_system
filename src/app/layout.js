'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fault Reporting",
  description: "Fault reporting system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className="h-full">
        {/* <nav className="mt-5 ml-10 text-xl">Fault Logging System</nav> */}
        <Navbar />
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
