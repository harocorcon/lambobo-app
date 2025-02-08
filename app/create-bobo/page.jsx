'use client'

import { useActionState } from "react"
import TransactionForm from "../components/TransactionForm"
import { createBobo } from "../actions/boboController";

export default function CreateBobo() {
    const [formState, formAction] = useActionState(createBobo, {});

    return (
        <>
        <h1 className="font-extrabold text-xl text-center mb-7">Create Bobo Page</h1>

            <form action={formAction} className="w-full max-w-sm mx-auto">
                <div className="flex flex-wrap items-center border-b border-teal-500 py-2">
                    <input required className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Title" aria-label="Full name"/>
                </div>
                    
                <div className="flex flex-wrap -mx-3 mb-2 mt-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                            Duration
                        </label>
                        {/* <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/> */}
                        <div className="relative">
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option>25 weeks</option>
                                <option>52 weeks</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                        
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                            Interest Rate
                        </label>

                        <div className="relative">
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option>10% kada buwan</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase text-center tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                            Transactions
                        </label>
                        <hr />

                        <TransactionForm />

                    </div>
                </div>

                { formState.error && (
                    <p className="text-center text-red-600">{formState.error}</p>
                )}

                <div>
                    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        // onClick={createBobo}
                    >
                        Submit
                    </button>
                </div>
                </form>
        </>

        
    )
}