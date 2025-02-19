'use client';

export default function SessionTabs({typeLabels}){

    const handleTabChange = (tab) => {
        console.log("clicked tab ", typeLabels[tab])
    }

    return (
        <div className="mt-2">
            <ul className="mt-2 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                {typeLabels.map((type, key) => (
                    <li key={key} className="me-2 mt-2">
                        <button onClick={()=>{handleTabChange(key)}}
                            aria-current="page" 
                            className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">
                                {type}
                        </button>
                    </li>
                ))}
            </ul>


            </div>
    )
}