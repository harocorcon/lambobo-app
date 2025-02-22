'use client';

import { useEffect, useState } from "react";


export default function TransactionTable({isLoanTab, disabledOperations, data, isOptional, saveDataFromTable}){
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0)
    const [error, setError] = useState({});
    const [disableSubmit, setDisableSubmit] = useState(false);
    
    useEffect(()=>{
        setRows(data)
        setTotal(0);
        setError({});
    }, [data]);

    useEffect(()=>{
        setDisableSubmit(false)
        if(!isOptional){
            rows.map((r)=>{
                if(r.status < 0)
                    setDisableSubmit(true)
            })
        }
    }, [rows])
    
    const setStatus = (key, value) => {
        let currentStatus = rows[key].status;
        let added = 0;

        if(currentStatus == 1 && value <= 0)
            added = -1 * (rows[key].amount);
        else if(currentStatus <= 0 && value == 1)
            added = rows[key].amount;

        setTotal(total + added);
        setRows((prevRows) => {
            const newRows = prevRows.map((row, index) => {
              if (index === key) {
                return { ...row, status: value }; 
              }
              return row;
            });
            return newRows;
        });
    }

    const isDataComplete = () =>{
        console.log("cleaning data...", isOptional)
        
        if(isOptional){
            console.log("data is optional")
            setRows((prevRows) => {
                return prevRows.filter((row) => row.status !== -1)
            });
        }

        else{
            rows.map((r) =>{
                if( r.status < 0){
                    setError({ success: false, message: 'Please recheck, you missed some rows.'});
                    return;
                }
            })
        }
        if(!error)
            saveDataFromTable(rows);
    }
    return (
        <div className="flex flex-col mt-3">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"></th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                        {isLoanTab && <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Loan</th>}
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Amount
                            {!isOptional && 
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-red-500 ml-3 inline-block">
                                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                                </svg>
                            }
                        </th>
                        <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        { rows && rows.map((d, key) => 
                            (<tr key={key} className="hover:bg-gray-100">
                                <td key={"cntr-"+key} className="px-2 py-4 whitespace-nowrap text-xs font-medium text-gray-500">{key+1}</td>
                                <td key={"name-"+key} className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{d.name}</td>
                                {isLoanTab && <td key={"loan-"+key} className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800">102345</td>}
                                <td key={"amt-"+key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    {d.amount}
                                    {d.status != -1 &&
                                        (<button onClick={()=>setStatus(key, -1)} disabled={disabledOperations}>
                                        {d.status > 0 ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-green-600 inline-flex ml-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>) : (
                                        d.status == 0 && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-red-600 inline-flex ml-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                        </svg>)}
                                        </button>
                                )}
                                </td> 
                                <td key={"actions-"+key} className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                    <button disabled={disabledOperations} onClick={()=>setStatus(key, 1)} type="button" className="inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border bg-green-500 px-2 py-1 hover:bg-green-600 text-white disabled:opacity-50 disabled:pointer-events-none">PAY</button>
                                    <button disabled={disabledOperations} onClick={()=>setStatus(key, 0)} type="button" className="inline-flex items-center ml-3 gap-x-2 text-xs font-semibold rounded-lg border bg-red-500 px-2 py-1 hover:bg-red-600 text-white disabled:opacity-50 disabled:pointer-events-none">PASS</button>
                                </td>
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
                        onClick={()=>isDataComplete()}>
                        Submit
                    </button>
                </div>
                </div>
            </div>
            </div>
    )
}