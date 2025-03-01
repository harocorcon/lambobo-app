'use client';

import { useState } from "react";
import CreateBoboForm from "./CreateBoboForm"
import TransactionForm from "./TransactionForm";
import { redirect, useRouter } from "next/navigation";
import { createBobo } from "../actions/boboController";

export default function CreateBobo() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: "",
        duration: "",
        startDate: "",
        interestRate: "",
        transactionTypes: [],
    });

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const updateFormData = (data) => {
        setFormData((prev) => ({...prev, ...data}));
    }

    const submitToController = async () => {
        setIsLoading(true)
        try {
            const newBobo = await createBobo(formData);
            console.log("returned newbobo", newBobo)
            setIsLoading(false);
            router.push("/")
        }catch(error){
            console.error(error)
        }
    }

    return (
        <>
        {isLoading ? (
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
            ) : (
            <>
            <h1 className="font-extrabold text-xl text-center mb-7">Create Bobo Cycle</h1>
            {step == 1 && <CreateBoboForm nextStep={nextStep} formData={formData} updateFormData={updateFormData}/>}
            {step == 2 && <TransactionForm handleCreate={submitToController} prevStep={prevStep} updateFormData={updateFormData}/>}
            { step == 2 && formData.transactionTypes.length > 0 &&
                <div className="text-center">
                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 disabled:opacity-50"
                    onClick={submitToController}>
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                        Create
                    </span>
                    </button>
                </div>
            }
            </>)
        }
        </>
    )
}