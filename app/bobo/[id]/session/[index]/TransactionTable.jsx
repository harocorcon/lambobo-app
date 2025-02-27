'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function 
    TransactionTable({
        isLoanTab, 
        disabledOperations, 
        data, 
        isOptional, 
        saveDataFromTable,
        sessionNumber,
        transactionsByAccount,
        activeTab,
        updateTransactionsByAccount,
        saveTransactions
    }){
    const router = useRouter();

    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0)
    const [error, setError] = useState({});
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [saveData, setSaveData] = useState([]);
    
    useEffect(()=>{
        setRows(data)
        setTotal(0);
        setError({});
    }, [data]);

    useEffect(()=>{
        setDisableSubmit(false);
        if(transactionsByAccount && !transactionsByAccount[0]?.transactions[activeTab].isOptional){
            transactionsByAccount.map((t)=>{
                if(t.transactions[activeTab].status < 0)
                    setDisableSubmit(true)
            })
        }
    }, [transactionsByAccount])
    
    const handleStatusChange = (key, value) => {
        let currentStatus = transactionsByAccount[key].transactions[activeTab].status;
        let currentAmount = transactionsByAccount[key].transactions[activeTab].amount;
        let added = 0;

        if(currentStatus == 1 && value <= 0)
            added = -1 * currentAmount;
        else if(currentStatus <= 0 && value == 1)
            added = currentAmount;

        setTotal(total + added);
        updateTransactionsByAccount(key, value);
    }

    const handleApplyLoan = (accountId) => {
        router.push(`/accounts/${accountId}?session=${sessionNumber}`);
    }

    return (
        <div className="flex flex-col mt-3">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                        {!isLoanTab &&
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                            </th>}
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                Name
                            </th>
                        {isLoanTab && 
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                Loan
                            </th>}
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        { transactionsByAccount && transactionsByAccount.map((d, key) => 
                            (<tr key={key} className="hover:bg-gray-100">
                            {!isLoanTab && 
                                <td key={"cntr-"+key} className="px-2 py-4 whitespace-nowrap text-xs font-medium text-gray-500">
                                    {key+1}
                                </td>}
                                <td key={"name-"+key} className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                    {d.name}
                                </td>
                                {isLoanTab && ( 
                                <>
                                    <td key={"loan-"+key} className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                        <button type="button" 
                                            onClick={()=>handleApplyLoan(d.account_id)}
                                            className="inline-flex items-center mr-3 gap-x-2 font-semibold disabled:opacity-50 disabled:pointer-events-none" >
                                                {d.loan.is_complete || d.loan.interest == 0 
                                                ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-blue-500 hover:text-blue-600">
                                                    <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clipRule="evenodd" />
                                                    <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z" clipRule="evenodd" />
                                                    </svg>

                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-orange-500 hover:text-orange-600">
                                                        <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875Z" />
                                                        <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 0 0 1.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 0 0 1.897 1.384C6.809 12.164 9.315 12.75 12 12.75Z" />
                                                        <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 15.914 9.315 16.5 12 16.5Z" />
                                                        <path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 19.664 9.315 20.25 12 20.25Z" />
                                                    </svg>
                                                )}
                                         </button>
                                        {d.loan.amount ?? 0}
                                    </td>
                                    <td key={"interest-"+key} className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                        {d.loan.interest ?? 0}
                                    </td>
                                </> )}

                                {!isLoanTab && 
                                    <td key={"amount-" + key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    {d.transactions[activeTab].amount}
                                    {d.transactions[activeTab].status != -1 
                                        && (
                                        <button onClick={()=>handleStatusChange(key, -1)} disabled={disabledOperations}>
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
                                </td> }
                                {<td key={"actions-"+key} className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                    <button 
                                        disabled={disabledOperations} 
                                        onClick={()=>handleStatusChange(key, 1)}//{()=>setStatus(key, 1)} 
                                        type="button" 
                                        className="inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border bg-green-500 px-2 py-1 hover:bg-green-600 text-white disabled:opacity-50 disabled:pointer-events-none">
                                            PAY
                                    </button>
                                    <button 
                                        disabled={disabledOperations} 
                                        onClick={()=>handleStatusChange(key, 0)}//{()=>setStatus(key, 0)} 
                                        type="button" 
                                        className="inline-flex items-center ml-3 gap-x-2 text-xs font-semibold rounded-lg border bg-red-500 px-2 py-1 hover:bg-red-600 text-white disabled:opacity-50 disabled:pointer-events-none">
                                        PASS
                                    </button>
                                </td>}
                            </tr>
                            ))
                        }
                    </tbody>
                    </table>
                </div>
                { error &&
                    <div className="p-2 text-xs text-red-400 text-center justify-center items-center">
                        <p>{error.message}</p>
                    </div>
                }
                <div className="flex items-center text-center justify-center">
                    <p className="mr-6 w-24">Total: {total}</p>
                    <button className="inline-flex ml-6 text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-md disabled:opacity-50 disabled:pointer-events-none"
                        disabled={disableSubmit}
                        // onClick={()=>saveDataFromTable(saveData)}>
                        onClick={saveTransactions}>
                        Submit
                    </button>
                </div>
                </div>
            </div>
            </div>
    )
}