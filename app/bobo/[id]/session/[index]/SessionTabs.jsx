'use client';

import { useState, useEffect } from "react";
import TransactionTable from "./TransactionTable";
import { getBoboAccounts } from "@/app/actions/accountController";
import { getTransactionTypes } from "@/app/actions/boboController";

export default function SessionTabs({boboDetails}){
    const { bobo, types } = boboDetails;
    const [activeTab, setActiveTab] = useState(0);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [accounts, setAccounts] = useState([]);

    const fetchAccounts = async() => {
        try {
            const accounts = await getBoboAccounts(bobo.id);
            return accounts;
        } catch (error) {
            console.error("Error fetching accounts:", error);
            return [];
        }
    }

    useEffect(()=>{
        setData([]);
        if(accounts.length > 0){
          let data = accounts.map((a) => ({
            name: a.name,
            amount: types[activeTab].amount ?? 0,
            status: -1,
          }));
          
        console.log(types[activeTab].amount, "updating data ", data)
          setData(data);
        }

      }, [accounts, activeTab]);

    useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true);
          try {
            setAccounts(await fetchAccounts());
            setIsLoading(false);
          } catch (err) {
            console.error(err);
            setIsLoading(false);
          }
        };
    
        fetchData(); // Call the async function
    
      }, [bobo]);
    
    
    const handleTabChange = (index) => {
        setActiveTab(index);
    }

    return (
        <div className="mt-2">
                <ul className="mt-2 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    {types && types.map((type, index) => (
                        <li key={index} className="me-2 mt-2">
                            <button onClick={()=>{handleTabChange(index)}}
                                aria-current="page" 
                                className={`inline-block p-4 rounded-t-lg ${activeTab === index ? 'text-white bg-blue-500 dark:bg-blue-600' : 'text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                >    {type.label}
                            </button>
                        </li>
                    ))}
                </ul>

            { data.length > 0 && (<TransactionTable data={data} />)}
        </div>
    )
}