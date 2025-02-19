'use client';

import { useEffect, useState } from "react";


export default function TransactionTable({data}){
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);
    
    useEffect(()=>{
        setRows(data)
        setTotal(0);
    }, [data]);
    
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
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        { rows && rows.map((d, key) => 
                            (<tr key={key} className="hover:bg-gray-100">
                                <td key={"cntr-"+key} className="px-2 py-4 whitespace-nowrap text-xs font-medium text-gray-500">{key+1}</td>
                                <td key={"name-"+key} className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{d.name}</td>
                                <td key={"amt-"+key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    {d.amount}
                                    {d.status != -1 &&
                                        (<button onClick={()=>setStatus(key, -1)}>
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
                                    <button onClick={()=>setStatus(key, 1)} type="button" className="inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border bg-green-500 px-2 py-1 hover:bg-green-600 text-white disabled:opacity-50 disabled:pointer-events-none">PAY</button>
                                    <button onClick={()=>setStatus(key, 0)} type="button" className="inline-flex items-center ml-3 gap-x-2 text-xs font-semibold rounded-lg border bg-red-500 px-2 py-1 hover:bg-red-600 text-white disabled:opacity-50 disabled:pointer-events-none">PASS</button>
                            </td>
                            </tr>
                            ))
                        }
                    </tbody>
                    </table>
                </div>
                <div className="flex items-center text-center justify-center">
                    <p>Total: {total}</p>
                </div>
                </div>
            </div>
            </div>
    )
}