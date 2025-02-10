'use client'

import { useActionState, useEffect, useRef, useState } from "react"
import TransactionForm from "../components/TransactionForm"
import StartDate from "../components/StartDate"
import { createBobo } from "../actions/boboController";
import moment from "moment";

export default function CreateBobo() {
    const [formState, formAction] = useActionState(createBobo, {});
    const [title, setTitle] = useState();
    const [transactionLabel, setTransactionLabel] = useState();
    const [startDate, setStartDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    // }
    
    const formRef = useRef(null)

    return (
        <>
        <h1 className="font-extrabold text-xl text-center mb-7">Create Bobo Page</h1>
            <form action={formAction} ref={formRef} className="w-full max-w-sm mx-auto space-y-4">
                <div className="flex flex-wrap items-center border-b border-teal-500 py-2">
                    <input 
                        required 
                        className="appearance-none bg-transparent border-none w-full text-gray-800 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                        type="text" 
                        placeholder="Title" 
                        aria-label="Title"
                        autoComplete="title"
                        id="title"
                        name="title"/>
                </div>
                    
                <div className="w-full mt-2">

                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                        Duration
                    </label>
                    <div className="relative">
                        <select 
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="grid-state"
                            name="duration">
                                <option value="25">25 weeks</option>
                                <option value="52">52 weeks</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>

                    <div className="w-full mt-2">
                        
                        { !formState?.success && (
                            <p className="text-center text-red-600">{formState.error}</p>
                        )}
                        <StartDate setStartDate={setStartDate}/>
                        <input type="hidden" name="startDate" value={startDate} />
                    </div>
                    <div className="w-full mt-2">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                            Interest Rate
                        </label>

                        <div className="relative">
                            <select
                                name="interestRate" 
                                id="interest-rate" 
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                    <option value="10">10% kada buwan</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>

                    {/* <div className="w-full mt-4">
                        <label className="block uppercase text-center tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                            Transactions
                        </label>
                        <hr />

                        <TransactionForm />
                    </div> */}
                </div>


                <div>
                    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        // onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
                </form>
        </>

        
    )
}