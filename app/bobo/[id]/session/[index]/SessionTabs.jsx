'use client';

import { useState, useEffect } from "react";
import TransactionTable from "./TransactionTable";
import { getBoboAccounts } from "@/app/actions/accountController";
import { createTransactions } from "@/app/actions/transactionController";
import dayjs from "dayjs";

export default function SessionTabs({boboDetails, index}){
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
            bobocycle_id: bobo.id,
            session_number: index,
            date: dayjs().format('YYYY-MM-DD'),
            ttype_id: types[activeTab].id,
            amount: types[activeTab].amount,
            status: -1,
            account_id: a.id,
            name: a.name,
          }));
          
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

    //saving happens here?
    const saveDataFromTablez = (data) => {
       //di ko kasabot nganng kada change sa status, maupdate ngari
        console.log("prepared data for database: ", data);
    }

    const saveDataFromTable = async (data) => {
        setIsLoading(true);
        try {
            await createTransactions(data);
        } catch (error) {
            console.error("Error saving accounts:", error);
        } finally {
            setIsLoading(false);   
        }
    };

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

            { !isLoading ? (<TransactionTable data={data} saveDataFromTable={saveDataFromTable}/>
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