'use client'

import { useEffect, useState } from "react";

export default function AccountTransactions({transactions, transactionTypes}){
    const tabs = ["All", "Missed", "Paid"];
    const [sessions, setSessions] = useState([])

    useEffect(()=>{
        const sesh = {};
        transactions.forEach((t) => {
            const sessionNumber = t.session_number;

            if(!sesh[sessionNumber-1]){
                sesh[sessionNumber-1] = [];
            }
            sesh[sessionNumber-1].push(t);
        });
        setSessions(Object.values(sesh));

    }, [transactions])

    const getTransactionLabel = (typeId) => {
        const found = transactionTypes.find((type) => type.id === typeId);
        return found ? found.label: '';
    }


    return (
        <div className="mt-2">
            <h1 className="mx-0">Transactions</h1>
        
                <ul className="mt-2 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    {tabs.map((type, index) => (
                        <li key={index} className="me-1 mt-2">
                            <button 
                                aria-current="page" 
                                className={` inline-block px-2 py-3 rounded-t-lg text-white bg-blue-400 hover:bg-blue-500 dark:hover:bg-gray-700`}
                                >    {type}
                            </button>
                        </li>
                    ))}
                </ul>

                {
                    sessions && (
                        sessions.map((session, index) => (
                        <div key={'sessioncard-'+index}>
                            <p>Session {index+1}</p>
                            { session.map((s,index)=>(
                                <div key={index} className="flex justify-between">
                                    <p>{s.date}</p>
                                    <p>{getTransactionLabel(s.ttype_id)}</p>
                                    <p>{s.amount}</p>
                                </div>
                            ))
                            }
                            
                        </div>
                        )))
                }
        </div>
    )
}