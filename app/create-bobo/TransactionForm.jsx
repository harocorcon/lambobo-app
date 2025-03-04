import { useEffect, useState } from "react"

export default function TransactionForm({prevStep, updateFormData}) {
    const init = {
        label: "", amount: 0, isOptional: false
    }
    const [tranTypes, setTranTypes] = useState([init]);
    const [isShowAdd, setIsShowAdd] = useState(false);

    useEffect(() => {
        setIsShowAdd(tranTypes[tranTypes.length-1].label ? true: false)
        updateFormData({transactionTypes: tranTypes})
    }, [tranTypes])

    const handleChange = (index, field, value) => {
        const updated = [...tranTypes];
        updated[index][field] = value;
        setTranTypes(updated);
    };

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
        <div className="flex flex-col w-full max-w-sm mx-auto space-y-4 p-6">
        {tranTypes.map((trantype, index) => (
            <div key={index} className="border p-3 mb-3 rounded bg-gray-100">
                {
                    index > 0 &&
                    <div className="relative">
                        <button className="absolute text-red-600 hover:text-red-800 right-0 -top-1"
                            onClick={()=>removeTransaction(index)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-3">
                            <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
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
                <button 
                    onClick={prevStep} 
                    className="text-xs m-2 items-center bg-sky-400 hover:bg-sky-600  text-white py-2 px-4 rounded-lg"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                    <path d="M7.712 4.818A1.5 1.5 0 0 1 10 6.095v2.972c.104-.13.234-.248.389-.343l6.323-3.906A1.5 1.5 0 0 1 19 6.095v7.81a1.5 1.5 0 0 1-2.288 1.276l-6.323-3.905a1.505 1.505 0 0 1-.389-.344v2.973a1.5 1.5 0 0 1-2.288 1.276l-6.323-3.905a1.5 1.5 0 0 1 0-2.552l6.323-3.906Z" />
                    </svg>
                </button>
                
                { isShowAdd && <button
                    className="group cursor-pointer outline-none hover:rotate-90 duration-300 ml-auto"
                    title="Add"
                    onClick={addTransaction}
                    >
                    <svg
                        className="stroke-teal-500 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300"
                        viewBox="0 0 24 24"
                        height="25px"
                        width="25px"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        strokeWidth="1.5"
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                        ></path>
                        <path strokeWidth="1.5" d="M8 12H16"></path>
                        <path strokeWidth="1.5" d="M12 16V8"></path>
                    </svg>
                </button>}
                
            </div>
        </div>
    )
}