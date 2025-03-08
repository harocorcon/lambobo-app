import { format } from "date-fns";
import Link from "next/link";

export default function SessionCard({sessionStats, date, boboName, index, isViewing}){
    return (
        <div className="justify-center flex flex-col my-8 bg-white shadow-sm hover:shadow-md border border-slate-200 rounded-lg max-w-md p-6 items-center"> {/* items-center for horizontal centering */}
            <div className="flex items-center mb-2 w-full justify-center"> {/* w-full and justify-center for title centering */}
                <h5 className="text-slate-800 text-xl font-semibold">
                {boboName}
                </h5>
            </div>

            <div className="flex items-center mb-2 w-full justify-center"> {/* w-full and justify-center for title centering */}
                {index > 1 && 
                <Link href={`${(index-1)}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-blue-500 hover:text-blue-600">
                    <path fillRule="evenodd" d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clipRule="evenodd" />
                    </svg>
                </Link>}
                <h5 className="text-slate-800 text-lg font-semibold mx-5">
                {`Session ${index}`}
                </h5>
                {index < 30 &&
                    <Link href={`${++index}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-blue-500 hover:text-blue-600">
                        <path fillRule="evenodd" d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                        </svg>
                    </Link>
                }
            </div>

            <div
                name="bobo-details"
                className="block text-slate-600 text-xs leading-normal font-light mb-4 space-y-2 w-full" /* w-full for full width */
            >
                <div className="inline-flex items-center justify-center w-full"> {/* justify-center for date centering */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4 inline-block"
                >
                    <path
                    fillRule="evenodd"
                    d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                    clipRule="evenodd"
                    />
                </svg>

                <p className="ml-2 text-xs">{format(date, "MMMM d, yyyy")}</p>
                </div>


                <table className="text-xs table-auto w-[70%] mx-auto">
                    <tbody>
                        <tr>
                        <td className="py-1 font-bold">Total Collection:</td>
                        <td className="py-1 text-right">{sessionStats.collection}</td> 
                        </tr>
                        {isViewing && 
                        <tr>
                        <td className="py-1 font-bold">Missed Payments:</td>
                        <td className="py-1 text-right">{sessionStats.missed}</td>
                        </tr>}
                        <tr>
                        <td className="py-1 font-bold">Released Loan:</td>
                        <td className="py-1 text-right">{sessionStats.releasedLoan}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
    )
}