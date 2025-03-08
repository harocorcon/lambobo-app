'use client';

import { getBoboSummary } from "@/app/actions/boboController";
import { getMostRecentSession } from "@/app/actions/sessionController";
import { computeAllTransactions } from "@/app/actions/transactionController";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ActualComputation from "./ActualComputation";
import AccountsSection from "./AccountsSection";
import { getBoboAccounts } from "@/app/actions/accountController";
import { getTotalUnpaidLoans } from "@/app/actions/loanController";

export default function BahinayPage(){
    const params = useParams();
    const id = params.id;
    
    const [isLoading, setIsLoading] = useState(false);
    const [bobo, setBobo] = useState({});
    const [mostRecent, setMostRecent] = useState({});
    const [boboStats, setBoboStats] = useState({});
    const [totalByType, setTotalByType] = useState([]);
    const [actualTotal, setActualTotal] = useState(0);
    const [adminFee, setAdminFee] = useState(0);
    const [bahin, setBahin] = useState(0);
    const [accounts, setAccounts] = useState([]);
    const [totalUnpaidLoan, setTotalUnpaidLoan] = useState(0);

    const fetchBoboDetails = async (id) => {
        try{
            const details = await getBoboSummary(id);
            return details;
        }catch(error){
            console.error("Error in fetching bobo details. ", error)
            return {};
        }
    }

    const fetchMostRecentSession = async (id) => {
        try{
            const mrs = await getMostRecentSession(id);
            return await mrs;
        }catch(error){
            console.error("Error in fetching most recent session. ", error)
            return {};
        }
    }

    const fetchBoboStats = async (id) => {
        try{
            const stats = await computeAllTransactions(id);
            return stats;
        }catch(error){
            console.error("Error in computing all transactions. ", error)
            return {};
        }
    }
    
    const fetchAccounts = async (id) => {
        try {
            const accounts = await getBoboAccounts(id)
            return accounts;
        }catch(error){
            console.error("Error in fetching accounts for the bahinay page.")
            return [];
        }
    }

    const fetchTotalUnpaidLoan = async (id) => {
        try {
            const unpaid = await getTotalUnpaidLoans(id)
            return unpaid;
        }catch(error){
            console.error("Error in fetching accounts for the bahinay page.")
            return [];
        }
    }

    useEffect(() => {
        const loadContents = async () => {
            setIsLoading(true);
            try {
                setBobo(await fetchBoboDetails(id));
                setMostRecent(await fetchMostRecentSession(id));
                setBoboStats(await fetchBoboStats(id));
                setAccounts(await fetchAccounts(id));
                setTotalUnpaidLoan(await fetchTotalUnpaidLoan(id));
            } catch(error){
                console.error("Error hanling content: ", error)
            } finally {
                setIsLoading(false)
            }
        }
        loadContents();
    }, [id])

    useEffect(() => {
        if(boboStats){
            const { totalByTtype } = boboStats;
            setTotalByType(totalByTtype);
        }
    }, [boboStats])

    useEffect(() => {
        if(actualTotal > 0)
            setBahin((actualTotal - adminFee) / bobo.accountsCount)
    }, [actualTotal, adminFee])

    

    return (
        <>
        { isLoading ? (
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
            ):(
        <div>
            <div className="flex flex-col my-8 bg-white shadow-sm hover:shadow-md border border-slate-200 rounded-lg max-w-md p-6">
                <div className="justify-center mb-2">
                    <h5 className=" text-slate-800 text-xl font-serif text-center font-semibold">
                        {bobo.bobo?.name}
                    </h5>
                </div>

                <table className="text-xs table-auto w-[80%] mx-auto">
                    <tbody className="space-y-2">
                        <tr>
                        <td className="py-1 font-bold">Accounts:</td>
                        <td className="py-1 text-right">{bobo.accountsCount}</td> 
                        </tr>
                        <tr>
                        <td className="py-1 font-bold">Most Recent:</td>
                        <td className="py-1 text-right">
                            <Link className="inline-block text-blue-600 underline" href={`session/${mostRecent.session_number}`}>
                                Session {mostRecent.session_number}
                            </Link>    
                        </td> 
                        </tr>

                        {totalByType && totalByType.map((tbt, x) => (
                            <tr key={x}>
                            <td className="py-1 text-left font-bold">{tbt.label}:</td>
                            <td className="py-1 text-right font-serif font-bold">{tbt.total}</td>
                            </tr>
                        ))}

                        <tr>
                        <td className="py-1 font-bold">Unpaid Loans</td>
                        <td className="py-1 text-right font-serif text-red-500">
                            {totalUnpaidLoan}
                        </td> 
                        </tr>
                    </tbody>
                </table>
            </div>
            <ActualComputation 
                actualTotal={actualTotal ?? 0} 
                adminFee={adminFee ?? 0} 
                setActualTotal={setActualTotal} 
                setAdminFee={setAdminFee} 
                bahin={bahin ?? 0} 
            />

            <AccountsSection accounts = {accounts } bahin = { bahin }/>
        </div>
            )}
            </>
    )
}