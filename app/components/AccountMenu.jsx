'use client';

import dayjs from "dayjs"
import { useState } from "react"
import AccountForm from "./AccountForm"
import { createAccounts } from "../actions/accountController"

export default function AccountMenu({bobo}) {
    const [showForm, setShowForm] = useState(false);
    const [accounts, setAccounts] = useState([{name: "", phone: ""}]);
    const [saving, setSaving] = useState(false);
    const boboId = bobo.id;

    const canAddMembers = (startdate) =>{
        return !dayjs().isAfter(startdate)
    }

    const handleAddAccount = () => {
        setShowForm(!showForm);
    };

    const handleSaveAccounts = async () => {
        setSaving(true); 
        try {
            console.log(bobo.id, "handleSaveAccounts ")
            await createAccounts(accounts, boboId);
            console.log("Accounts saved successfully!");
            setShowForm(false);
            setAccounts([{ name: "", phone: "" }]);
        } catch (error) {
            console.error("Error saving accounts:", error);
        } finally {
            setSaving(false);   
        }
      };

    return (
        <div className="flex flex-col">
        <div id="add-member-menu" className="flex justify-between items-center">
            <p className="w-auto font-bold">Accounts</p>
            
            {canAddMembers(bobo.startdate) && 
                <div className="flex-1 ml-4">
                    <button className=" hover:bg-blue-300 bg-blue-400 p-1 rounded-lg text-white text-xs"
                        onClick={()=>handleAddAccount()}
                        >Account Form</button>
                </div>
            }
            {accounts.length > 1 && <div className="mt-2">
                <button 
                    onClick={handleSaveAccounts} disabled={saving}
                    className="text-sky-500 hover:text-sky-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                        <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>}
        </div>
        
            
        {showForm && 
            <div className="w-full"><AccountForm accounts={accounts} setAccounts={setAccounts} /></div>}
        </div>
    )
}
