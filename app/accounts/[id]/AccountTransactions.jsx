'use client'

import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function AccountTransactions({transactions, transactionTypes, handleResolveTransaction}){
    const tabs = ["All", "Missed", "Paid"];
    const [sessions, setSessions] = useState([])
    const [isResolving, setIsResolving] = useState(false);
    const [indexLoading, setIndexLoading] = useState(-1);

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

    const handleResolve = (transaction, i) => {
        if(transaction.status < 1){
            setIndexLoading(i);
            setIsResolving(true);
            console.log("kani magresolve,")
            handleResolveTransaction(transaction);
            setTimeout(() => {
                setIsResolving(false);
                setIndexLoading(-1);
            }, 1000);
        }
    }

    return (
        <div className="mt-2">
            <h1 className="mx-0">Transactions</h1>
        
                {/* <ul className="mt-2 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    {tabs.map((tab, index) => (
                        <li key={index} className="me-1 mt-2">
                            <button 
                                aria-current="page" 
                                className={` inline-block px-2 py-3 rounded-t-lg text-white bg-blue-400 hover:bg-blue-500 dark:hover:bg-gray-700`}
                                >    {tab}
                            </button>
                        </li>
                    ))}
                </ul> */}

                {
                    sessions && (
                        sessions.map((session, index) => (
                            <div key={'sessioncard-'+index} className="flex flex-col py-2">

                            <div className="text-center text-xs relative">
                                <div className="absolute inset-x-0 top-1.5 h-px bg-gray-300"></div>
                                <p className="bg-black inline-block px-4 mb-3 text-white rounded-lg relative">
                                    {index + 1}: {dayjs(session[0].date).format('MMMM D, YYYY')}
                                </p>
                            </div>

                                <table className="text-xs table-auto w-full">
                                    <tbody>
                                        {session.map((s, index) => (
                                            <tr key={index}>
                                                <td className="w-1/3 truncate py-1">{getTransactionLabel(s.ttype_id)}</td>
                                                <td className="w-1/3 text-left py-1">{s.amount}</td>
                                                <td className="w-1/3 text-right py-1">
                                                    <button
                                                        onClick={()=>handleResolve(s, index)} 
                                                        className={`${s.status > 0? getTransactionLabel(s.ttype_id) === "Loan"? 'bg-blue-600': 'bg-green-500':'bg-gray-700'} text-xs text-white rounded-lg py-1 px-2`}>
                                                        {isResolving && (s.status === 0 && indexLoading===index) &&
                                                        (<svg aria-hidden="true" className="inline-block mr-2 w-3 h-3 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                        </svg>)
                                                        }
                                                        {s.status > 0? getTransactionLabel(s.ttype_id) === "Loan"? 'Released': 'Paid': 'Resolve'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )))
                    }
        </div>
    )
}