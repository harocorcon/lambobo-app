import { useEffect } from "react";

export default function ResolveModal({showModal, closeModal, handleResolveTransaction, details}) {
    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === "Escape") {
            closeModal(); // Close the modal when Esc is pressed
          }
        };
    
        document.addEventListener("keydown", handleKeyDown);
    
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
      }, [closeModal]);
    return (
        <>
            {
                showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
                            <h1 className="text-lg font-semibold text-gray-900">
                            Resolving this transaction
                            </h1>
                            <p className="p-0 text-lg font-bold">{details.name}</p>

                            <table className="text-slate-600 table-auto w-[80%] mx-auto">
                            <tbody className="space-y-2 text-xs">
                                <tr>
                                    <td className="py-1 font-bold">Session {details.session}: </td>
                                    <td className="py-1 text-right">{details.date}</td> 
                                </tr>
                                <tr>
                                    <td className="py-1 font-bold">{details.label}:</td>
                                    <td className="py-1 text-right">{details.amount}</td> 
                                </tr>
                            </tbody>
                        </table>
                            
                            <div className="flex gap-4">
                            <button
                                type="button"
                                className="bg-blue-800 hover:bg-blue-700 text-white rounded py-1 px-4"
                                onClick={() => handleResolveTransaction()}
                            >
                                Resolve
                            </button>
                            <button
                                type="button"
                                className="bg-red-800 hover:bg-red-700 text-white rounded py-1 px-4"
                                onClick={closeModal}
                            >
                                No
                            </button>

                            
                            </div>
                        </div>
                    </div>

                )
            }
        </>
    )
}