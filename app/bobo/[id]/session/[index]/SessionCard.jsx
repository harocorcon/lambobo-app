import { format } from "date-fns";
import Link from "next/link";

export default function SessionCard({sessionStats, date, boboName, index}){
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
                    <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
                    </svg>
                </Link>}
                <h5 className="text-slate-800 text-lg font-semibold mx-5">
                {`Session ${index}`}
                </h5>
                {index < 30 &&
                    <Link href={`${++index}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-blue-500 hover:text-blue-600">
                        <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
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
                        <tr>
                        <td className="py-1 font-bold">Missed Payments:</td>
                        <td className="py-1 text-right">3</td>
                        </tr>
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