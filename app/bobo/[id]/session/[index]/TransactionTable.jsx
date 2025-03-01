'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function 
    TransactionTable({
        isViewing, // can't udate payment
        isLoanTab, 
        disabledOperations, 
        // data,
        sessionNumber,
        transactionsByAccount,
        activeTab,
        updateTransactionsByAccount,
        types,
        
    }){
    const router = useRouter();
    const [total, setTotal] = useState([]);
    const [disableSubmit, setDisableSubmit] = useState(false);

    useEffect(()=>{
        setDisableSubmit(false);
        if(transactionsByAccount && !transactionsByAccount[0]?.transactions[activeTab].isOptional){
            transactionsByAccount.map((t)=>{
                if(t.transactions[activeTab].status < 0)
                    setDisableSubmit(true)
            })
        }
        if( transactionsByAccount && total.length < 1){
            let init = [];
            transactionsByAccount.map((t)=>init.push(0))
            setTotal(init)
        }
    }, [transactionsByAccount])
    
    const handleStatusChange = (key, value) => {
        let currentStatus = transactionsByAccount[key].transactions[activeTab].status;
        let currentAmount = isLoanTab? transactionsByAccount[key].loan.interest: transactionsByAccount[key].transactions[activeTab].amount;
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
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                            </th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                Name
                            </th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                Amount
                        </th>
                        {!isViewing && <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                            Action
                        </th>}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        { transactionsByAccount && transactionsByAccount.map((d, key) => 
                            (<tr key={key} className="hover:bg-gray-100">
                            
                                <td key={"cntr-"+key} className="px-2 py-4 whitespace-nowrap text-xs font-medium text-gray-500">
                                    {key+1}
                                </td>

                            <td key={"name-"+key} className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                {d.name}
                            </td>

                            {/* { // loan column
                                isLoanTab && ( 
                                <>
                                    <td key={"loan-"+key} className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                        
                                        {d.loan.amount ?? ''}
                                    </td>
                                </> )} */}
                            {/* icon next to amount for paid, pass */}
                            <td key={"amount-" + key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {/* {isLoanTab? d.loan.interest == 0? '' : d.loan.interest:  */}
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
                            </td> 

                            {!isViewing && 
                                <td key={"actions-"+key} className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                {isLoanTab? (
                                    <button type="button" 
                                    onClick={()=>handleApplyLoan(d.account_id)}
                                    // className="inline-flex items-center mr-3 gap-x-2 font-semibold disabled:opacity-50 disabled:pointer-events-none" >
                                    className="inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border bg-green-500 px-2 py-1 hover:bg-green-600 text-white disabled:opacity-50 disabled:pointer-events-none">
                                        {d.loan.is_complete || d.loan.interest == 0 
                                        ? 'Apply': 'Resolve'}
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

                <div className="flex items-center text-center justify-center">
                    <p className="mr-6 w-24">Total: {total[activeTab]}</p>
                    {/* <button className="inline-flex ml-6 text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-md disabled:opacity-50 disabled:pointer-events-none"
                        disabled={disableSubmit}
                        onClick={saveTransactions}>
                        Submit
                    </button> */}
                </div>
                </div>
            </div>
            </div>
    )
}