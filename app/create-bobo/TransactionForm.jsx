import { useEffect, useState } from "react"

export default function TransactionForm({prevStep, updateFormData, handleCreate}) {
    const init = {
        label: "", amount: 0, isOptional: false
    }
    const [tranTypes, setTranTypes] = useState([init]);

    useEffect(() => {
        updateFormData({transactionTypes: tranTypes})
    }, [tranTypes])

    // Handle input changes
    const handleChange = (index, field, value) => {
        const updated = [...tranTypes];
        updated[index][field] = value;
        setTranTypes(updated);
    };

    // Add a new transaction form
    const addTransaction = () => {
        setTranTypes([...tranTypes, { label: "", amount: "10", isOptional: false }]);
    };

    const removeTransaction = (index) => {
        if (tranTypes.length > 1) {
            const updated = tranTypes.filter((_, i) => i !== index);
            setTranTypes(updated);
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto space-y-4 p-6">
        {tranTypes.map((trantype, index) => (
            <div key={index} className="border p-3 mb-3 rounded bg-gray-100">
                {
                    index > 0 &&
                    <div className="relative">
                        <button className="absolute text-red-600 hover:text-red-800 right-0 -top-2"
                            onClick={()=>removeTransaction(index)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>

                        </button>
                    </div>
                }
                {trantype.label && index == (tranTypes.length-1) && (index < 5) &&
                    <div className="relative">
                        <button className="absolute text-green-600 hover:text-green-800 right-5 -top-2"
                            onClick={addTransaction}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                            </svg>



                        </button>
                    </div>
                }
                
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                    Payment Label
                </label>
                
                <input 
                    id="transaction-label"
                    name="transactionLabel"
                    required 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    type="text" 
                    placeholder="Label"
                    autoComplete="false"
                    value={trantype.label}
                    onChange={(e) => handleChange(index, "label", e.target.value)}
                />

                <div className="flex items-center">
                    <input 
                        id="bordered-checkbox-1" 
                        type="checkbox" 
                        value="isOptional" 
                        name="isOptional" 
                        checked={trantype.isOptional}
                        onChange={(e) => handleChange(index, "isOptional", e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="bordered-checkbox-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tanan miembro ba angay mobayad ani?</label>
                </div>

                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                    Tagpila man?
                </label>
                <div className="relative">
                    <select
                        onChange={(e) => handleChange(index, "amount", e.target.value)}
                        value={trantype.amount}
                        name="amount"
                        id="amount" 
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={100}>100</option>
                        <option value={200}>200</option>
                        <option value="depende">depende</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>
            ))}

            <div className="flex">
                <button onClick={prevStep} className="mt-5 mb-5 items-center mx-auto bg-sky-400 hover:bg-sky-600  text-white text-sm py-2 px-4 rounded"
                >
                    {'<<'}
                </button>
                
                
                <button onClick={handleCreate} className="mt-5 mb-5 items-center mx-auto bg-sky-400 hover:bg-sky-600  text-white text-sm py-2 px-4 rounded"
                    disabled={!tranTypes}
                >
                    Create Bobo
                </button>
            </div>
        </div>
    )
}