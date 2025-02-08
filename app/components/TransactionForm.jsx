


export default function TransactionForm() {

    return (
        <div className="flex flex-col w-full md:w-1/3 px-3 mb-6 mt-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                Payment Label
            </label>
            <input 
                id="transaction-label"
                name="transactionLabel"
                required 
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Savings"/>

            <div className="flex items-center">
                <input 
                    id="bordered-checkbox-1" 
                    type="checkbox" 
                    value="isOptional" 
                    name="isOptional" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="bordered-checkbox-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tanan miembro ba angay mobayad ani?</label>
            </div>

            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                Tagpila man?
            </label>
            <div className="relative">
                <select
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

            <div className="flex mx-auto">
                <button className="mt-5 mb-5  bg-blue-400 hover:bg-[#205a86]  text-white text-sm py-2 px-4 rounded"
                >
                    Add Transaction Type
                </button>
            </div>
        </div>
    )
}