'use client'

import dayjs from "dayjs";
import { getAllBoboSummary } from "../actions/boboController";
import { useEffect, useState } from "react";
import { isUserValid } from "../actions/userController";
import BoboCard from "./BoboCard";
import Link from "next/link";


export default function BoboList() {
    const [boboDetails, setBoboDetails] = useState([]);
    const [fetching, setFetching] = useState(false);

    useEffect(()=>{
        async function fetchData() {
            setFetching(true)
            if (!isUserValid()) {
                redirect('/login');
            }
        
            try {
                const data = await getAllBoboSummary();
                setBoboDetails(data);
            } catch (error) {
                console.error("Error fetching bobo details:", error);
            }finally{
                setFetching(false);
            }
            }
      
        fetchData();
    }, []);

    let header = fetching? 'Loading...' : 'Bobo Cycle List'
    return (
        <div className="h-screen">
            <h1 className="text-xl font-extrabold mx-auto p-3">{header}</h1>
                {!fetching ? (
                    boboDetails.map((detail, key) => (
                        <Link key={key} href={`/bobo/${detail.bobo.id}`}>
                            <BoboCard boboDetails={detail}/>
                        </Link>
                    ))
                    ) : (
                        <div className="flex justify-center items-center">
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
            

        </div>
    )
}
