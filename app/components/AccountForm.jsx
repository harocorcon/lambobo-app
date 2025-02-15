

export default function AccountForm({accounts, setAccounts}) {

    const addAccount = (name) => {
        if(name!==""){
            setAccounts([...accounts, {name: "", phone: ""}])

        } }
    const removeAccount = (index) => {
        if(accounts.length > 1){
            const update = accounts.filter((_, i) => i != index);
            setDetails(update);
        }
    }

    const handleChange = (index, field, value) => {
        const update = [...accounts];
        update[index][field] = value;
        setAccounts(update);
    }

    return (
        <div className="w-full">
        {accounts.map((account, index) => (
            <div 
            key={index}
             className="flex items-center justify-between border-b p-2">
                <input
                    type="text"
                    placeholder="Name"
                    value={account.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    className="bg-gray-100 flex-1 text-xs p-1 outline-none rounded"
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={account.phone}
                    onChange={(e) => handleChange(index, 'phone', e.target.value)}
                    className="bg-gray-100 flex-1 p-1 text-xs outline-none ml-1 rounded"
                />
                

                <button className={`ml-2 text-sm ${accounts.length > 1? `hover:text-red-600 text-red-500`: ` text-gray-500`}`}
                onClick={()=>removeAccount(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                    </svg>
                </button>

                <button className={`ml-2 text-sm ${account.name? `hover:text-green-600 text-green-500`: ` text-gray-500`}`}
                    onClick={()=>addAccount(account.name)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
         ))}
        </div>
    )
}