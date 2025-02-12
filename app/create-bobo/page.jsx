'use client'

import { useState } from "react";
import CreateBoboForm from "./CreateBoboForm"
import TransactionForm from "./TransactionForm";
import { createBobo } from "../actions/boboController";

export default function CreateBobo() {
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

    const submitToController = () => {
        console.log(formData.transactionTypes, "submitToController", formData);
        createBobo(formData);
    }

    return (
        <>
            <h1 className="font-extrabold text-xl text-center mb-7">Create Bobo Cycle</h1>
            {step == 1 && <CreateBoboForm nextStep={nextStep} formData={formData} updateFormData={updateFormData}/>}
            {step == 2 && <TransactionForm handleCreate={submitToController} prevStep={prevStep} updateFormData={updateFormData}/>}

        </>

        
    )
}