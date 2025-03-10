import Link from "next/link";



export default function AccountsSection ({accounts, bahin}) {


    return (
        <div className="flex flex-col mt-3">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                    <h2 className="text-center font-semibold">Account List</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                            </th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                Name
                            </th>
                        {bahin > 0 && <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                Amount
                        </th>}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        { accounts && accounts.map((a, key) => 
                            (<tr key={key} className="hover:bg-gray-100">
                            
                                <td key={"cntr-"+key} className="px-2 py-4 whitespace-nowrap text-xs font-medium text-gray-500">
                                    {key+1}
                                </td>

                            <td key={"name-"+key} className="px-2 py-4 whitespace-nowrap text-sm font-medium text-blue-500">
                                <Link href={`/accounts/${a.account_id ? a.account_id: a.id}`}>
                                    {a.name}
                                </Link>
                            </td>

                            
                            {bahin > 0 && (
                                <>
                                <td key={"newloan-" + key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {Math.floor(bahin)}
                            </td>

                            <td key={"actions-"+key} className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                <button type="button" 
                                className={`inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border bg-green-500 px-2 py-1 hover:bg-green-600 text-white disabled:opacity-50 disabled:pointer-events-none`}>
                                    Received
                                </button>
                            </td>
                            </>)
                            }
                            
                            </tr>
                            ))
                        }
                    </tbody>
                    </table>
                </div>

                </div>
            </div>
            </div>
    )
}