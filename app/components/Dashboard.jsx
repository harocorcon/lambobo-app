'use client';

import Link from "next/link";
import BoboList from "./BoboList";
import { useState } from "react";

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => { setIsLoading(true) }
    return (
        <>
        <div className="flex flex-col justify-center mx-auto m-6 items-center">
            <Link href="/create-bobo" onClick={handleClick}>
                <button disabled={isLoading} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                        {isLoading? 'Lezz gooo!': 'Get Started!'}
                    </span>
                </button>

                {
                    isLoading && 
                    (
                        <div className="mt-8 flex justify-center items-center">
                            <svg
                              className="animate-spin h-8 w-8 text-blue-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          </div>
                    )
                }
            </Link>

            <BoboList />

            

        </div>
</>
    )
}