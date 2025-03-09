'use client';

import { useState, useEffect } from "react";
import TransactionTable from "./TransactionTable";
import { createLoan, getLoansByBobo, updateLoan } from "@/app/actions/loanController";
import { getBoboAccounts } from "@/app/actions/accountController";
import { createTransactions, getTransactionsBySession } from "@/app/actions/transactionController";
import { createSession, checkIfSessionExists } from "@/app/actions/sessionController"
import { addWeeks, format } from "date-fns";
import SessionCard from "./SessionCard";

export default function SessionTabs({boboDetails, index}){
    const { bobo, types } = boboDetails;
    const [activeTab, setActiveTab] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const sessionDate = addWeeks(bobo.startdate, index - 1)
    const [loans, setLoans] = useState([]);
    const [ transactionsByAccount, setTransactionsByAccount ] = useState(null);
    const [transactionHistory, setTransactionHistory] = useState({});
    const [isColumnReady, setIsColumnReady] = useState(Array.from({ length: types.length }, () => false));
    const [loanToSave, setLoanToSave] = useState([]);
    const [isViewing, setIsViewing] = useState(false);
    const [sessionHistory, setSessionHistory] = useState([]);
    const [sessionStats, setSessionStats] = useState({});

    
    
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

        return {...loan, interest, hasApplied: false}
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
    
    const handleAllSessionTransactions = () => {
        saveTransactions();
        saveLoans();
        saveSession();
    }
    
    const handleTabChange = (index) => {
        setActiveTab(index);
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
        if(!isViewing){
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
        }
        else{
            const trueAll = types.map(t => true);
            setIsColumnReady(trueAll);
        }
    }, [transactionsByAccount])

    useEffect(()=>{
        setIsLoading(true);
        if(accounts.length > 0){
            if(!isViewing){
                let transactionsPerAccount = accounts.map((a) => {
                    const loa = getLoanByAccount(a.id);
                    const interest = loa.interest;
                    return {
                        bobocycle_id: bobo.id,
                        session_number: index,
                        date: format(sessionDate, 'yyyy-MM-dd'),
                        transactions: types.map((tab, i) => { 
                            const transaction = {
                                ttype_id: tab.id, 
                                type_label: tab.label,
                                amount: tab.amount > 0? tab.amount: tab.label === "Loan"? 0: interest, 
                                isOptional: tab.isOptional,
                                status: -1,
                            }
                            if(tab.label === "Loan")
                                transaction.newLoan = 0;
                            return transaction;
                        }),
                        account_id: a.id,
                        name: a.name,
                        loan: loa,
                    }});
                setTransactionsByAccount(transactionsPerAccount);
                setIsLoading(false);
            } else {
                const fetchHistory = async () => {
                    try{
                        const record = await sessionRecord();
                        setSessionHistory(record);
                        setIsLoading(false);
                    }catch(error){
                        console.error("Error in fetching session", error)
                    }
                }
                fetchHistory();
            }
        }
      }, [accounts]);

    const findThisTransaction = (ttype_id, account_id) => {
    if(sessionHistory){
        const sessionData = sessionHistory.data;
        return sessionData.find(sd => {
            return sd.account_id === account_id && sd.ttype_id === ttype_id;
        });
    }
    return null;
    }

    const checkSessionExists = async () => {
        try{
            const getSession = await checkIfSessionExists(bobo.id, index);
            return getSession;
        }catch(error){
            console.error("Can't fetch session table. ", error)
        }
    }

    const sessionRecord = async() => {
        try{
            const history = await getTransactionsBySession(bobo.id, index);
            return history;
        }catch(error){
            console.log("error in get transaction by session")
        }
    }

    useEffect(() => {
        if(sessionHistory){
            let transactionsPerAccount = accounts.map((a) => {
                const loa = getLoanByAccount(a.id);
                const interest = loa.interest;
                return {
                    bobocycle_id: bobo.id,
                    session_number: index,
                    date: format(sessionDate, 'yyyy-MM-dd'),
                    account_id: a.id,
                    name: a.name,
                    loan: loa,
                    transactions: types.map((tab, i) => { 
                        const transactionHistory = findThisTransaction(tab.id, a.id);
                            const transaction = {
                                ttype_id: tab.id, 
                                type_label: tab.label,
                                amount: transactionHistory? transactionHistory.amount: 0,
                                isOptional: tab.isOptional,
                                status: transactionHistory? transactionHistory.status: -1,
                            }
                            if(tab.label === "Loan")
                                transaction.newLoan = 0;
                            return transaction;
                        }
                    ),
                }});
            setTransactionsByAccount(transactionsPerAccount);
            }    
    }, [sessionHistory]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try{
                const sessionExists = await checkSessionExists();
                setIsViewing(sessionExists.length > 0);
                setLoans(await fetchLoans());
                setAccounts(await fetchAccounts());
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();

        setSessionStats({
            collection: 0,
            missed: 0,
            releasedLoan: 0,
        })

    }, [bobo]);

    const updateSessionStats = (newUpdate) => {
        setSessionStats((prev) => ({
            ...prev, ...newUpdate
        }))
    }

    useEffect(() => {
        if(loans){
            const icr = isColumnReady.map((icr, i) => {
                if(types[i].isOptional){
                    if(icr.label === "Interest" && loans.length > 0)
                        return false;
                    return true;
                }
                return false;
            })
            setIsColumnReady(icr);
        }
    }, [loans])

    const updateTransactionsNewLoan = (accountIndex, value) => {
        setTransactionsByAccount((prev) => {
            return prev.map((item, i) => {
                if(item.account_id === accountIndex){
                    const updatedTransactions = item.transactions.map((transaction, tabIndex) => {
                        if (transaction.type_label === "Loan") {
                          return { ...transaction, amount: value, status: 1 };
                        }
                        return transaction;
                    });
                    return { ...item, transactions: updatedTransactions };
                }
                return item;
            })
        });
    }

    const updateTBAhasApplied = (accountIndex, value) => {
        setTransactionsByAccount((prev) => {
            return prev.map((item, i) => {
                if(item.account_id === accountIndex){
                    let updated = item.loan;
                    updated.hasApplied = value;
                    return { ...item, loan: updated };
                }
                return item;
            })
        });
    }

    
    const updateLoanToSave = (modalDetails) => {
        const newLoan = {
            account_id: modalDetails.account_id,
            amount: modalDetails.amount,
            applied_on: sessionDate,
            bobocycle_id: bobo.id,
            is_active: true,
            is_complete: true,
            loan_id: modalDetails.loanId,
            session_number: index,
        };

        if(modalDetails.account_id){
            setLoanToSave((prev) => {
                const updated = [...prev, newLoan];
                return updated;
            })

            updateTransactionsNewLoan(modalDetails.account_id, modalDetails.newLoan);
            updateTBAhasApplied(modalDetails.account_id, true)
        }
    }

    const saveLoans = async () => {
        setIsLoading(true);
        loanToSave.map((loan) => {
            if(loan.loan_id < 0){
                console.log("creating a new loan ", loan);
                const createThisLoan = async(loan) => {
                    try{
                        await createLoan(loan);
                        setIsLoading(false);
                    }catch(error){
                        console.error("Error in creating a new loan", error)
                    }
                }
                createThisLoan(loan);
                return;
            } else {
                const updateThisLoan = async(loan) =>{
                    try{
                        const updatedLoan = await updateLoan(loan);
                        console.log("loan is finally updated, ", updatedLoan)
                        setIsLoading(false);
                    }catch(error){
                        console.error("Error in updating the loan", error)
                    }
                }
                updateThisLoan(loan);
            }

        })        
    }

    const saveSession = async () => {
        try{
            const sessionRecord = {
                session_number: index,
                date: sessionDate,
                bobocycle_id: bobo.id
            }
            let session = await createSession(sessionRecord);
            setIsLoading(false);
        } catch(error) {
            console.error("Error saving accounts:", error);
        } finally {
            setIsLoading(false);   
        }
    }

    const saveTransactions = async () => {
        setIsLoading(true);
        let allTransactions = [];
            for (const tba of transactionsByAccount) {
                for ( const transaction of tba.transactions) {
                    const appliedNewLoan = -1;
                    if( transaction.label === "Loan" && transaction.newLoan != 0)
                        appliedNewLoan = transaction.newLoan;
                    let data = {
                        bobocycle_id: bobo.id,
                        account_id: tba.account_id,
                        ttype_id: transaction.ttype_id,
                        date: sessionDate,
                        amount: appliedNewLoan < 0 ? transaction.amount: appliedNewLoan,
                        status: appliedNewLoan < 0 ? transaction.status: 1,
                        session_number: index,
                    }
                    if(transaction.status >= 0 || appliedNewLoan > 0)
                        allTransactions.push(data);
                }
        }
        try{
            const transactionResult = await createTransactions(allTransactions);
            setIsLoading(false);
        }catch(error){
            console.error(error)
        }
    }

    return (
        <div className="mt-2">
            <SessionCard sessionStats={sessionStats} date={sessionDate} boboName={bobo.name} index={index} isViewing={isViewing} />

        <div className="py-5">
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
                    <button 
                        disabled={isViewing || !isColumnReady.every(Boolean)} 
                        onClick={handleAllSessionTransactions}
                        className="bg-blue-500 hover:bg-blue-600 py-1 px-2 rounded-lg disabled:opacity-50">
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
                                className={`inline-block pt-4 pb-4 pl-2 pr-2 rounded-t-lg ${activeTab === index ? 'text-white bg-blue-500 hover:bg-blue-600' : 'text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                >    {type.label}
                            </button>

                            
                        </li>
                    ))}
                </ul>

            { !isLoading ? 
                (
                    <TransactionTable 
                        isViewing={isViewing}
                        isOptional={types[activeTab].isOptional}
                        isLoanTab={types[activeTab].label==="Loan"}
                        sessionNumber={index}
                        transactionsByAccount = {transactionsByAccount}
                        activeTab={activeTab}
                        updateTransactionsByAccount={updateTransactionsByAccount}
                        saveTransactions={saveTransactions}
                        isColumnReady={isColumnReady}
                        updateLoanToSave={updateLoanToSave}
                        updateSessionStats={updateSessionStats}
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