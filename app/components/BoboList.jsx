'use client'

import dayjs from "dayjs";
import Link from "next/link";
import { getAllBoboSummary } from "../actions/boboController";
import { useEffect, useState } from "react";
import { isUserValid } from "../actions/userController";


export default function BoboList() {
    const [boboDetails, setBoboDetails] = useState([]);

    useEffect(()=>{
        async function fetchData() {
            if (!isUserValid()) {
                redirect('/login');
            }
        
            try {
                const data = await getAllBoboSummary();
                setBoboDetails(data);
            } catch (error) {
                console.error("Error fetching bobo details:", error);
            }
            }
      
        fetchData();
    }, []);

    let header = !boboDetails.length? 'You have not created any Bobo cycle yet':
            'Bobo Cycle List'
    return (
        <div className="h-screen">
            <h1 className="text-xl font-extrabold mx-auto p-3">{header}</h1>
                
                {boboDetails.map((detail, key) => (
                    <div key={key}>
                    <Link href={`/bobo/${detail.bobo.id}`}>
                    <div className="relative flex flex-col my-6 bg-white shadow-sm hover:shadow-md border border-slate-200 rounded-lg w-96 p-6">
                        <div className="flex items-center mb-2">
                            <h5 className=" text-slate-800 text-xl font-semibold">
                                {detail.bobo.name}
                            </h5>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 ml-2 hover:text-green-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </div>

                        <div name="bobo-details"
                            className="block text-slate-600 leading-normal font-light mb-4">
                            <p className="text-xs">{getSchedule(detail.bobo.startdate, detail.bobo.duration)}</p>
                            <p>Interest: {detail.bobo.interest}% per month</p>
                            <p>Accounts: {detail.accountsCount}</p>
                            <p>Transaction Types: {detail.typeLabels.length}</p>
                        </div>
                    </div>
                    </Link>
                    </div>
                ))}
            

        </div>
    )
}

const getSchedule = (start, length) => {
    let end = dayjs(start).add(length, "week").format("YYYY-MM-DD");
    return dayjs(start).format('MMMM DD, YYYY') + " to " + dayjs(end).format('MMMM DD, YYYY') + " ("+length+" weeks)"
}