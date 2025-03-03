import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { createLoan, updateLoan } from "../actions/loanController";

export default function LoanForm({
        loanDetails, 
        setShowLoanModal,
        setLoanInput,
        setLoanUpdate,
    }){
    const [inputValue, setInputValue] = useState(0);
    const [total, setTotal] = useState(0);
    const [perWeek, setPerWeek] = useState(0);
    const [isApplying, setIsApplying] = useState(false);
    const [loaned, setLoaned] = useState(0);


    useEffect(() => {
        setTotal(inputValue + loaned)
        setPerWeek(Math.ceil((((inputValue + loaned) * 10) / 100) / 4))
    }, [inputValue])

    useEffect(() => {
        if(loanDetails){
            const loan = loanDetails.loan.amount ?? 0;
            setTotal(loan);
            setLoaned(loan);
        }
    }, [loanDetails])


    const handleInputChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setInputValue(value);

        const numericValue = parseInt(value, 10);
        if (!isNaN(numericValue)) {
        }
    }

    const handleApplyLoan = () => {
        setIsApplying(true);
        // update transactions.newLoan to inputValue
        handleLoan(total);
        setTimeout(() => {
            setIsApplying(false);
          }, 1000);
    }

    const handleLoan = (amount) => {
        
        const newLoan = {
            amount,
            newLoan: inputValue,
            account_id: loanDetails.account_id,
            loanId: loanDetails.loan.id ?? -1,
        }
        // console.log(loanDetails, "newloaaan ", newLoan);
        setLoanUpdate(newLoan);
        // if(loan?.id > -1){
        //     updateThisLoan({...newLoan, id: loan.id});
            
        // }else{
        //     let {data, error } = createThisLoan(newLoan);
        // }
        
        setTimeout(() => {
            setShowLoanModal(false)
        }, 1000);
    }
    
    const updateThisLoan = async(loanData) =>{
        try{
            await updateLoan(loanData);
        }catch(error){
            console.error("Error in updating the loan", loanDetails.loan.id, error)
        }
    }

    const createThisLoan = async(loanData) => {
        try{
            await createLoan(loanData);
        }catch(error){
            console.error("Error in creating a new loan", error)
        }
    }


    return(
        <>
        <form className="justify-center flex flex-col my-8 bg-white shadow-sm hover:shadow-md border border-slate-200 rounded-lg max-w-md p-6" > 
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                New Loan: <span className="font-normal">{loaned} +</span>
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="amount" type="number" placeholder="Amount" onChange={handleInputChange}/>
            </div>
            
            <div className="w-full">
                <div className="flex items-center justify-between">
                <div className="flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                        <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
                    </svg>
                    <p className="text-xs pl-3"> {total}</p>
                </div>
                <div className="flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500 size-4">
                        <path fillRule="evenodd" d="M6.32 1.827a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V19.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V4.757c0-1.47 1.073-2.756 2.57-2.93ZM7.5 11.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H8.25Zm-.75 3a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75H8.25Zm1.748-6a.75.75 0 0 1 .75-.75h.007a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.007a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.335.75.75.75h.007a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.007Zm-.75 3a.75.75 0 0 1 .75-.75h.007a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.007a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.335.75.75.75h.007a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75h-.007Zm1.754-6a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.008Zm-.75 3a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75h-.008Zm1.748-6a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.008Zm-8.25-6A.75.75 0 0 1 8.25 6h7.5a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75v-.75Zm9 9a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-2.25Z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs pl-3"> {perWeek} /week</p>
                </div>
                
            </div>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 disabled:opacity-50 text-xs text-white font-bold py-1.5 mt-5 justify-center px-4 rounded focus:outline-none focus:shadow-outline" 
                type="button"
                disabled={!inputValue || isApplying}
                onClick={()=>handleApplyLoan()}>
                    {isApplying? 'Processing...' :'Apply'}
            </button>
        </form>
        </>
    )
}