'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoanFormModal from "@/app/components/LoanFormModal"
import Link from "next/link";

export default function 
    TransactionTable({
        isViewing,
        isLoanTab, 
        disabledOperations, 
        transactionsByAccount,
        activeTab,
        updateTransactionsByAccount,
        updateLoanToSave,
        updateSessionStats,
    }){
    const router = useRouter();
    const [total, setTotal] = useState([]);
    const [showLoanModal, setShowLoanModal] = useState(false);
    const [loanDetails, setLoanDetails] = useState(null);

    useEffect(()=>{
        if(!isViewing && transactionsByAccount){
            if(total.length < 1){
                let init = [];
                transactionsByAccount.map((t)=>init.push(0))
                setTotal(init)
            }
            if(isLoanTab){
                let totalLoan = 0;
                transactionsByAccount.map(tba => {
                    totalLoan += tba.transactions[activeTab].amount    
                })
                const updateTotal = total;
                updateTotal[activeTab] = totalLoan;
                setTotal(updateTotal);
            }
        }else if(isViewing && transactionsByAccount){
            let temp = new Array(transactionsByAccount[0]?.transactions.length).fill(0);
            let missed = 0;
            transactionsByAccount && transactionsByAccount.map((transaction)=>{
                transaction.transactions.map((type, i) => {
                    if(type.status > 0)
                        temp[i] += type.amount;
                    else if(type.status === 0)
                        missed += 1;
                })
            });
            setTotal(temp);
            updateSessionStats({ missed });
        }
    }, [transactionsByAccount])

    useEffect(() => {
        // not including the last since it must be the loan
        const collection = total.slice(0, total.length-1)
                                .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        updateSessionStats({collection, releasedLoan: total[total.length-1]});
    }, [total])
    
    const handleStatusChange = (key, value) => {
        let currentStatus = transactionsByAccount[key].transactions[activeTab].status;
        let currentAmount = transactionsByAccount[key].transactions[activeTab].amount;
        let added = 0;

        if(currentStatus == 1 && value <= 0)
            added = -1 * currentAmount;
        else if(currentStatus <= 0 && value == 1)
            added = currentAmount;
        const updated = [...total];
        updated[activeTab] = total[activeTab] + added;
        setTotal(updated);
        updateTransactionsByAccount(key, value);
    }

    const handleApplyLoan = (transactionAccount) => {
        setShowLoanModal(true);
        setLoanDetails(transactionAccount)
    }

    return (
        <div className="flex flex-col mt-3">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            {/* <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                            </th> */}
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                Name
                            </th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                Amount
                        </th>
                        {isLoanTab && <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                            New
                        </th>}
                        {!isViewing && <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                            Action
                        </th>}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        { transactionsByAccount && transactionsByAccount.map((d, key) => 
                            (<tr key={key} className="hover:bg-gray-100">
                            
                                {/* <td key={"cntr-"+key} className="px-2 py-4 whitespace-nowrap text-xs font-medium text-gray-500">
                                    {key+1}
                                </td> */}

                            <td key={"name-"+key} className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                <Link href={`/accounts/${d.account_id}`}>
                                    {d.name}
                                </Link>
                            </td>

                            
                            {isLoanTab && <td key={"newloan-" + key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {d.loan.amount ?? ''}
                            </td>}

                            <td key={"amount-" + key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {d.transactions[activeTab].amount}
                                {d.transactions[activeTab].status != -1 
                                    && (
                                    <button onClick={()=>handleStatusChange(key, -1)} disabled={isViewing}>
                                        {d.transactions[activeTab].status > 0 ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-green-600 inline-flex ml-3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        ) : (
                                        d.transactions[activeTab].status == 0 && 
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-red-600 inline-flex ml-3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                            </svg>
                                        )}
                                    </button>
                                )}
                            </td> 


                            {!isViewing && 
                                <td key={"actions-"+key} className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                {isLoanTab? (
                                    <button type="button" 
                                    onClick={()=>handleApplyLoan(d)}
                                    disabled={d.loan.hasApplied}
                                    className={`inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border bg-green-500 px-2 py-1 hover:bg-green-600 text-white disabled:opacity-50 disabled:pointer-events-none`}>
                                        {d.loan.is_complete || d.loan.interest == 0 
                                        ? d.loan.hasApplied? 'Pending...': 'Apply': 'Resolve'}
                                    </button>
                                ) : (
                                d.transactions[activeTab].amount > 0 &&
                                    <>
                                    <button 
                                        disabled={disabledOperations} 
                                        onClick={()=>handleStatusChange(key, 1)}
                                        type="button" 
                                        className="inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border bg-green-500 px-2 py-1 hover:bg-green-600 text-white disabled:opacity-50 disabled:pointer-events-none">
                                            PAY
                                    </button>
                                    <button 
                                        disabled={disabledOperations} 
                                        onClick={()=>handleStatusChange(key, 0)} 
                                        type="button" 
                                        className="inline-flex items-center ml-3 gap-x-2 text-xs font-semibold rounded-lg border bg-red-500 px-2 py-1 hover:bg-red-600 text-white disabled:opacity-50 disabled:pointer-events-none">
                                        PASS
                                    </button>
                                    </>
                                    )}
                                </td>
                            }
                            </tr>
                            ))
                        }
                    </tbody>
                    </table>
                </div>

                <div className="bg-blue-500 rounded-md text-white py-3 flex items-center text-center justify-center">
                    <p className="mr-6 w-24">Total: <span className="font-semibold ml-5">{total[activeTab]}</span></p>
                </div>

                <LoanFormModal 
                    loanDetails={loanDetails} 
                    showModal={showLoanModal} 
                    updateLoanToSave={updateLoanToSave}
                    setShowLoanModal={()=>setShowLoanModal(false)}/>
                </div>
            </div>
            </div>
    )
}