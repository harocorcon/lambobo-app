'use client'

import { getAccountById } from "@/app/actions/accountController";
import AccountCard from "./AccountCard"
import LoanForm from "./LoanForm"
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getLoanByAccount } from "@/app/actions/loanController";
import dayjs from "dayjs";

export default function AccountPage() {
    const id = useParams().id;
    const searchPar = useSearchParams();
    const session = searchPar.get('session');
    const apply = searchPar.get('apply');
    const [isLoading, setIsLoading] = useState(true);
    const [showLoanForm, setShowLoanForm] = useState(false);
    
    const [account, setAccount] = useState(null);
    const [loan, setLoan] = useState(null);

    const fetchAccount = async(id) => {
        try{
            const account = await getAccountById(id);
            return await account;
        }catch(error){
            console.error("Error in fetching account. ", error)
            return {};
        }
    }

    const fetchLoan = async(id) => {
        try{
            const loan = await getLoanByAccount(id)
            if(loan?.data)
                return await loan.data
            return {};
        }catch(error){
            console.error("Error in fetching account. ", error)
            return {};
        }
    }

    const toggleShowForm = () => {
        setShowLoanForm(!showLoanForm)
    }

    useEffect(()=>{
        const loadContents = async () => {
            setIsLoading(true);
            setAccount(await fetchAccount(id));
            setLoan(await fetchLoan(id));
            setIsLoading(false)
        }
        loadContents();
    }, [id]);

    const handleLoan = (amount) => {
        const newLoan = {
            amount,
            bobocyle_id: account?.bobocycle_id,
            applied_on: dayjs().format('YYYY-MM-DD'),
            account_id: id,
            session_number: session,
            is_active: true,
            is_complete: true,
        }
        console.log(loan, "create new entry loan ", newLoan)
        if(loan){
            // update loan entry
        }else{
            console.log("create new entry loan ", newLoan)
        }
    }

    return(
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
                <>
                <AccountCard 
                    account={account} 
                    loan={loan}
                    toggleShowForm={toggleShowForm}/>
                {showLoanForm && <LoanForm loan={loan.amount ?? 0} handleLoan={handleLoan}/>}
                </>
            )
        }
        </>
    )
}