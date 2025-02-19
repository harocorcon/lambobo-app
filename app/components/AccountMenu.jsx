'use client';

import dayjs from "dayjs"
import { useState, useEffect } from "react"
import AccountForm from "./AccountForm"
import { createAccounts, getBoboAccounts } from "../actions/accountController"

export default function AccountMenu({boboDetails}) {
    const [showForm, setShowForm] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [newAccounts, setNewAccounts] = useState([{name:"", phone:""}]);

    const [saving, setSaving] = useState(false);
    const { bobo } = boboDetails;
    const boboId = bobo.id;

    useEffect(()=>{
        fetchAccounts();
    }, [])

    useEffect(()=>{
        fetchAccounts();
    }, [saving])

    const fetchAccounts = async() => {
        try {
            const data = await getBoboAccounts(boboId);
            setAccounts(data);
        } catch (error) {
            console.error("Error fetching accounts:", error);
        }
    }

    const canAddMembers = (startdate) =>{
        return !dayjs().isAfter(startdate)
    }

    const handleAddAccount = () => {
        setShowForm(!showForm);
    };

    const handleSaveAccounts = async () => {
        setSaving(true);
        try {
            await createAccounts(newAccounts, boboId);
            // setShowForm(false);
            setNewAccounts([{name:"", phone:""}]);
        } catch (error) {
            console.error("Error saving accounts:", error);
        } finally {
            setSaving(false);   
            setShowForm(false);
        }
    };

    return (
        <div className="flex flex-col">
            <div id="add-member-menu" className="flex justify-between items-center">
                <p className="w-auto font-bold">Accounts</p>
                
                {/*  canAddMembers if dateNow.isBefore(startdate) */}
                {canAddMembers(bobo.startdate) && 
                    <div className="flex-1 ml-4">
                        <button className=" hover:bg-blue-300 bg-blue-400 p-1 rounded-lg text-white text-xs"
                            onClick={()=>handleAddAccount()}
                            disabled={saving}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                <path d="M8.5 4.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 13c.552 0 1.01-.452.9-.994a5.002 5.002 0 0 0-9.802 0c-.109.542.35.994.902.994h8ZM12.5 3.5a.75.75 0 0 1 .75.75v1h1a.75.75 0 0 1 0 1.5h-1v1a.75.75 0 0 1-1.5 0v-1h-1a.75.75 0 0 1 0-1.5h1v-1a.75.75 0 0 1 .75-.75Z" />
                                </svg>

                            </button>
                    </div>
                }
                {newAccounts.length > 1 && 
                    <div className="mt-2">
                    <button 
                        onClick={handleSaveAccounts} disabled={saving}
                        className="text-sky-500 hover:text-sky-600"
                    >
                        {saving? (
                            <svg
                                className="animate-spin h-5 w-5 mr-3 ..." // Tailwind animation class
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clipRule="evenodd" />
                            </svg>
                            )
                        }
                    </button>
                </div>}
            </div>
        
            
            {showForm && 
                <>
                    <div className="w-full"><AccountForm disabled={true} accounts={accounts} setAccounts={setAccounts}/></div>
                    <div className="w-full"><AccountForm disabled={false} accounts={newAccounts} setAccounts={setNewAccounts} savedCount={accounts.length}/></div>
                </>
            }

            {
                saving && 
                (
                    <div className="flex justify-center items-center">
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
                )
            }
        </div>
    )
}
