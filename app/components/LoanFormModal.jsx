

import { useEffect, useState } from "react";
import LoanForm from "./LoanForm";

export default function LoanFormModal({
    loanDetails,
    showModal,
    setShowLoanModal,
    updateLoanToSave
}) {
    const [loanUpdate, setLoanUpdate] = useState({});

    useEffect(() => {
        updateLoanToSave(loanUpdate);
    }, [loanUpdate])

    return (
        <>
            {
                showModal && (
                    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-500 bg-opacity-75"
                        
                    >
                        <div className="relative">
                            <button type="button" className="absolute top-3 left-44 text-gray-800 p-2"
                            onClick={() => setShowLoanModal(false)}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="bg-white rounded-lg p-8 max-w-md w-full">
                            <LoanForm 
                                loanDetails={loanDetails} 
                                setShowLoanModal={setShowLoanModal}
                                setLoanUpdate={setLoanUpdate}
                            />
                        </div>
                    </div>
                )
            }
        </>
    )
}