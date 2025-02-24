'use client';

import { getBoboName, getBoboSummary } from "@/app/actions/boboController";
import { useState } from "react";


export default function AccountCard({ account, loan, toggleShowForm }) {
    const [isLoading, setIsLoading] = useState(false);
    const [transactions, setTransactions] = useState([{}]);
    const [boboName, setBoboName] = useState('');


    return(
        <>
        <div className="justify-center flex flex-col my-8 bg-white shadow-sm hover:shadow-md border border-slate-200 rounded-lg max-w-md p-6">
            <div className="flex flex-col items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

                {account && <h5 className=" text-slate-800 text-xs font-semibold">
                    {account.name}
                </h5>}
                
            </div>

            <div
                className="block text-slate-600  text-xs font-light mb-4">
                <p className="p-1 font-bold text-xs">Total Contribution: </p>
                <p className="p-1 font-bold text-xs">Current Loan: 
                    <span className="pl-2 font-normal">{loan.amount ?? 0 }</span>
                    <button className="ml-2" onClick={toggleShowForm}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3 text-blue-500 hover:text-blue-600">
                        <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </p>
                <p className="p-1 font-bold text-xs">Missed Payment: <span className="font-normal">2346</span></p>
            </div>
        </div>

        <h2>{boboName}</h2>
        </>
    )
}