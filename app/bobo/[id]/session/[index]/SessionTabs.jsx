'use client';

import { useState, useEffect } from "react";
import TransactionTable from "./TransactionTable";
import { getLoansByBobo } from "@/app/actions/loanController";
import { getBoboAccounts } from "@/app/actions/accountController";
import { createTransactions, getTransactionsBySession } from "@/app/actions/transactionController";
import { createSession, getSession } from "@/app/actions/sessionController"
import { addWeeks, format } from "date-fns";

export default function SessionTabs({boboDetails, index}){
    const { bobo, types } = boboDetails;
    const [activeTab, setActiveTab] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [accounts, setAccounts] = useState([]);
    // const [isDataSaved, setIsDataSaved] = useState([]);
    const [isDataSaved, setIsDataSaved] = useState(Array.from({ length: types.length }, () => false));
    const sessionDate = addWeeks(bobo.startdate, index - 1)
    const [loans, setLoans] = useState([]);
    const [ transactionsByAccount, setTransactionsByAccount ] = useState(null);
    const [transactionHistory, setTransactionHistory] = useState({});
    const [isColumnReady, setIsColumnReady] = useState(Array.from({ length: types.length }, () => false));
    
    const fetchAccounts = async() => {
        try {
            const accounts = await getBoboAccounts(bobo.id);
            return accounts;
        } catch (error) {
            console.error("Error fetching accounts:", error);
            return [];
        }
    }
        
    const fetchLoans = async() => {
        try {
            const { data } = await getLoansByBobo(bobo.id);
            return data;
        } catch (error) {
            console.error(" Error fetching loans. ", error)
            return [];
        }
    }

    const isTransactionTypeConducted = async () => {
        const newIsDataSaved = []; // Array to store the boolean values
        setIsLoading(true);
        for (const tab of types) {
          try {
            const sessionExists = await getSession(bobo.id, index, tab.id);
            newIsDataSaved.push(sessionExists && sessionExists.length > 0); // Push the boolean directly
          } catch (error) {
            console.error("Session Issues:", error);
            newIsDataSaved.push(false); // Push false on error
          }
        }
        setIsLoading(false);
        return newIsDataSaved; // Update state with the boolean array
      };

    const getTransactionHistory = async () => {
        const hasHistory = isDataSaved.some(value => value == true);
        const details = {bobocycle_id: bobo.id, session_number:index};
        console.log(details, "hashistory??? ", hasHistory)
        
        if(hasHistory){
            try{
                const history = await getTransactionsBySession(details);
                console.log("may historyyyyy ", history);
                return history;
            }catch(error){
                console.error("wala diay historyyy??", error)
            }
        }else{
           return {};
        }
    }

    const updateTransactionsByAccount = (accountIndex, value) => {
        setTransactionsByAccount((prev) => {
            return prev.map((item, i) => {
                if(i === accountIndex){
                    const updatedTransactions = item.transactions.map((transaction, tabIndex) => {
                        if (activeTab === tabIndex) {
                          return { ...transaction, status: value };
                        }
                        return transaction;
                    });
                    return { ...item, transactions: updatedTransactions };
                }
                return item;
            })
        });
    }

    const updateIsColumnReady = (index, value) => {
        setIsColumnReady(prev => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        })
    }

    useEffect(() => {
        if(transactionsByAccount && !types[activeTab].isOptional){
            let tabIsReady = true;
            transactionsByAccount.map((tba) => {
                if(tba.transactions[activeTab].status < 0)
                    tabIsReady = false;
            })
            if(isColumnReady && tabIsReady != isColumnReady[activeTab]){
                updateIsColumnReady(activeTab, tabIsReady)
            }
        }
        if(types[activeTab].label === 'Interest'){
            let tabIsReady = true;
            loans.map((loan) => {
                if(getAccountLoanStatus(loan.account_id) < 0)
                    tabIsReady = false;
            })
            if(isColumnReady && tabIsReady != isColumnReady[activeTab]){
                updateIsColumnReady(activeTab, tabIsReady)
            }
        }
    }, [transactionsByAccount])

    const getAccountLoanStatus = (id) => {
        const accountWithLoan = transactionsByAccount.find(o => o.account_id === id);
        return accountWithLoan.transactions[activeTab].status ?? -2;
    }

    const getLoanByAccount = (account) =>{
        let loan = loans.find((loan)=>(account === loan.account_id));
        let interest = 0;
        if(loan && loan.amount > 0){
            interest = Math.ceil(((loan.amount * bobo.interest) / 100) / 4);
        }
        return {...loan, interest}
    }

    const getStatusFromHistory = (a_id, t_id) => {
        if(transactionHistory){
            const found = transactionHistory?.filter((th) => {
                        (th.account_id == a_id) && 
                        (th.ttype_id === t_id)
                })
            console.log("found this! ", found)

            return found[0]?.status;
        }
        return -1;
    }

    useEffect(()=>{
        if(accounts.length > 0){
          let transactionsPerAccount = accounts.map((a) => {
            const loa = getLoanByAccount(a.id);
            const interest = loa.interest;
            const loanAmount = loa.amount;
            return {
                bobocycle_id: bobo.id,
                session_number: index,
                date: format(sessionDate, 'yyyy-MM-dd'),
                transactions: types.map((tab, i) => { 
                    return {
                        ttype_id: tab.id, 
                        type_label: tab.label,
                        amount: tab.amount > 0? tab.amount: tab.label === "Loan"? loanAmount: interest, 
                        isOptional: tab.isOptional,
                        status: -1,
                    }}),
                account_id: a.id,
                name: a.name,
                loan: loa,
            }});
          setTransactionsByAccount(transactionsPerAccount);
        }
      }, [accounts]);

    useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true);
          try {
            setLoans(await fetchLoans());
            setAccounts(await fetchAccounts());
            setIsLoading(false);
          } catch (err) {
            console.error(err);
            setIsLoading(false);
          }
        };
    
        fetchData();
      }, [bobo]);

    useEffect(() => {
        if(loans && loans.length > 0) {
            const updated = isColumnReady;
            types.map((t, i) => {
                if(t.isOptional){
                    updated[i] = true;
                }
                if(t.label === "Interest")
                    updated[i] = false;
            })
            setIsColumnReady(updated);
        }
    }, [loans])
    
    const handleTabChange = (index) => {
        setActiveTab(index);
    }

    const saveDataFromTable = async(rows) => {
        setIsLoading(true);
        try {
            await createTransactions(rows);
            setData(rows);
            setIsDataSaved((prev) => {
                const updated = [...prev];
                updated[activeTab] = true;
                return updated;
            })
        } catch (error) {
            console.error("Error saving transactions:", error);
        } finally {
            setIsLoading(false);   
        }
    };

    const saveTransactions = async () => {
        setIsLoading(true);
        try{
            const saving = transactionsByAccount.map((t)=>{
                const transaction = {
                    bobocycle_id: bobo.id,
                    account_id: t.account_id,
                    ttype_id: t.transactions[activeTab].ttype_id,
                    date: sessionDate,
                    amount: t.transactions[activeTab].amount,
                    status: t.transactions[activeTab].status,
                    session_number: index,
                };
                return transaction;
            });
            const transactionResult = await createTransactions(saving);

            if(transactionResult.success) {
                const sessionRecord = {
                    session_number: index,
                    date: sessionDate,
                    ttype_id: types[activeTab].id,
                    bobocycle_id: bobo.id
                }
                let session = await createSession(sessionRecord);
            }
        } catch(error) {
            console.error("Error saving accounts:", error);
        } finally {
            setIsLoading(false);   
        }
    }

    return (
        <div className="mt-2">
            
            <h1 className="pb-3">Session #{index} {format(sessionDate, 'MMMM d, yyyy')}</h1>

            <div className="py -5">
                <ul className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-xs dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
                    {
                        types.map( (t, i) => (
                        <li key={"progress-"+i} className="flex items-center text-blue-600 dark:text-blue-500">
                        <span className={`${isColumnReady[i]? 'bg-blue-500 text-white': 'bg-gray-100'} flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-blue-500`}>
                            {i+1}
                        </span>
                        <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
                        </svg>
                        </li>
                        ) )
                    }
                    <li key="submit" className="flex items-center text-white dark:text-blue-500">
                        <button disabled={!isColumnReady.every(Boolean)} className="bg-blue-500 hover:bg-blue-600 py-1 px-2 rounded-lg disabled:opacity-50">
                            Submit
                        </button>

                    </li>
                </ul>
            </div>

                <ul className="mt-2 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    {types.map((type, index) => (
                        <li key={index} className="me-1 mt-2">
                            <button onClick={()=>{handleTabChange(index)}}
                                aria-current="page" 
                                className={`${isDataSaved[activeTab] && activeTab === index  ? 'opacity-50':''} inline-block pt-4 pb-4 pl-2 pr-2 rounded-t-lg ${activeTab === index ? 'text-white bg-blue-500 hover:bg-blue-600' : 'text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                >    {type.label}
                            </button>

                            
                        </li>
                    ))}
                </ul>

            { !isLoading ? 
                (
                    <TransactionTable 
                        disabledOperations={isDataSaved[activeTab]} 
                        isViewing={isDataSaved[activeTab]}
                        // saveDataFromTable={saveDataFromTable}
                        isOptional={types[activeTab].isOptional}
                        // isLoanTab={activeTab === types.length-1}
                        isLoanTab={types[activeTab].label==="Loan"}
                        sessionNumber={index}
                        transactionsByAccount = {transactionsByAccount}
                        activeTab={activeTab}
                        updateTransactionsByAccount={updateTransactionsByAccount}
                        saveTransactions={saveTransactions}
                        isColumnReady={isColumnReady}
                    />

                ) : (
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
                )}
        </div>
    )
}