'use client'

import { getAccountById } from "@/app/actions/accountController";
import AccountCard from "./AccountCard"
import LoanForm from "../../components/LoanForm"
import AccountTransactions from "./AccountTransactions"
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createLoan, getLoanByAccount, updateLoan } from "@/app/actions/loanController";
import dayjs from "dayjs";
import { getAllTransactionsByAccount, getTotalTransactionAmountByAccount, resolveTransaction } from "@/app/actions/transactionController";
import { getBoboSummary } from "@/app/actions/boboController";

export default function AccountPage() {
    const id = useParams().id;
    const searchPar = useSearchParams();
    const session = searchPar.get('session');
    const [isLoading, setIsLoading] = useState(true);
    const [showLoanForm, setShowLoanForm] = useState(false);
    
    const [account, setAccount] = useState(null);
    const [loan, setLoan] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [bobo, setBobo] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [totalContribution, setTotalContribution] = useState(0);
    const [missedPayment, setMissedPayment] = useState(0);

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

    const fetchBoboDetails = async(id) => {
        try{
            const bobo = await getBoboSummary(id);
            return { name: bobo.bobo.name, types: bobo.types};
        }catch(error){
            console.error("Error in fetching account. ", error)
            return {};
        }
    }

    const fetchTransactions = async(id) => {
        try{
            const trans = await getAllTransactionsByAccount(id);
            return trans.data;
        }catch(error){
            console.error("Error in fetching account. ", error)
            return [];
        }
    }

    // const toggleShowForm = () => {
    //     setShowLoanForm(!showLoanForm)
    // }

    const getContribution = async (status) => {
        try{
            const sum = await getTotalTransactionAmountByAccount(account.id, status);
            return sum;
        }catch(error){
            console.serror("Error in computing sum of contributions for acount#", account.id)
        }
    }

    useEffect(()=>{
        const loadContents = async () => {
            setIsLoading(true);
            setAccount(await fetchAccount(id));
            setLoan(await fetchLoan(id));
            setTransactions(await fetchTransactions(id));
            setIsLoading(false)
        }
        loadContents();
    }, [id]);

    useEffect(() => {
        if (account && account.bobocycle_id) {
            const loadBobo = async () => {
              setBobo(await fetchBoboDetails(account.bobocycle_id));
              setTotalContribution(await getContribution(1));
              setMissedPayment(await getContribution(0));
            };

            loadBobo();
        }
    }, [account])

    // const handleLoan = (amount) => {
    //     const newLoan = {
    //         amount,
    //         bobocycle_id: account?.bobocycle_id,
    //         applied_on: dayjs().format('YYYY-MM-DD'),
    //         account_id: id,
    //         session_number: session,
    //         is_active: true,
    //         is_complete: true,
    //     }
    //     if(loan?.id > -1){
    //         updateThisLoan({...newLoan, id: loan.id});
            
    //     }else{
    //         let {data, error } = createThisLoan(newLoan);
    //     }
        
    //     setTimeout(() => {
    //         setShowLoanForm(false);
    //     }, 1000);
    // }

    const updateThisLoan = async(loanData) =>{
        try{
            await updateLoan(loanData);
        }catch(error){
            console.error("Error in updating the loan", loan.id, error)
        }
    }

    const createThisLoan = async(loanData) => {
        try{
            await createLoan(loanData);
        }catch(error){
            console.error("Error in creating a new loan", error)
        }
    }

    const handleResolveTransaction = async (transaction) => {
        setIsUpdating(true);
        try{
            const resolved = await resolveTransaction(transaction.id);
            console.log("resolved successfully//", resolved.data)
        }catch(error){
            console.error("Error in resolving this transaction.")
        }finally{
            setIsUpdating(false);
        }
    }

    useEffect(() => {
        const fromResolving = async () => {
            setTransactions(await fetchTransactions(id));
        }
        fromResolving();
    }, [isUpdating])

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
                    total={loan.amount > 0? totalContribution - loan.amount: totalContribution }
                    missed={missedPayment}
                    account={account} 
                    loan={loan}
                    // toggleShowForm={toggleShowForm}
                    />
                {/* {showLoanForm && <LoanForm loan={loan.amount ?? 0} handleLoan={handleLoan}/>} */}

                <AccountTransactions 
                    transactions={transactions} 
                    transactionTypes={bobo.types} 
                    handleResolveTransaction={handleResolveTransaction}
                />
                </>
            )
        }
        </>
    )
}