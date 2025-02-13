
export default function AccountForm() {

    return (
        <div className="w-full max-w-sm mx-auto space-y-4 shadow p-6 Pb-6">
            {/* { */}
                    {/* index > 0 && */}
                    <div className="relative">
                        <button className="absolute text-red-600 hover:text-red-800 right-0 -top-2"
                            // onClick={()=>removeTransaction(index)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>

                        </button>
                    </div>
                {/* } */}
                {/* {trantype.label && index == (tranTypes.length-1) && (index < 5) && */}
                     <div className="relative">
                        <button className="absolute text-green-600 hover:text-green-800 right-5 -top-6"
                            // onClick={addTransaction}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                            </svg>



                        </button>
                    </div>
                {/* } */}

            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                Name
            </label>
                
                <input 
                    id="account-name"
                    name="account-name"
                    required 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    type="text" 
                    placeholder="Name"
                />
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                Contact Number
            </label>
                
                <input 
                    id="account-phone"
                    name="account-phone"
                    required 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    type="text" 
                    placeholder="Number"
                    autoComplete="false"
                />
        </div>
            
    )
}