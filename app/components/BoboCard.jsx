import dayjs from "dayjs";
import Link from "next/link";

export default function BoboCard({ boboDetails, mostRecent }) {
    const { bobo, accountsCount, types } = boboDetails;
    const getSchedule = (start, length) => {
        let end = dayjs(start).add(length, "week").format("YYYY-MM-DD");
        return dayjs(start).format('MMMM DD, YYYY') + " to " + dayjs(end).format('MMMM DD, YYYY') + " ("+length+" weeks)"
    }

    return (
            <div className="justify-center flex flex-col my-8 bg-white shadow-sm hover:shadow-md border border-slate-200 rounded-lg max-w-md p-6">
                <div className="flex items-center mb-2">
                    <h5 className=" text-slate-800 text-xl font-semibold">
                        {bobo.name}
                    </h5>
                    
                </div>

                <div name="bobo-details"
                    className="block text-slate-600  text-xs leading-normal font-light mb-4 space-y-2">
                        <div className="inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 inline-block">
                            <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                            </svg>
                            <p className="ml-2 text-xs">{getSchedule(bobo.startdate, bobo.duration)}</p>
                        </div>
                    <p className="font-bold">Interest: <span className="font-normal">{bobo.interest}% per month</span></p>
                    <p className="font-bold flex items-center">Accounts:
                        <span className="font-normal text-xs ml-2">{accountsCount}</span>
                    </p>
                    <div className="flex items-center">
                        <p className="font-bold  mr-2">Transaction Types:</p>
                        <div className="flex flex-wrap gap-2"> {/* Use flexbox for layout */}
                        {types && types.map((type, key) => (
                            <button
                                key={key}
                                className="bg-sky-100 hover:bg-sky-200 text-gray-700 font-medium rounded-xl text-xs px-2 py-0 border border-gray-200" 
                            >
                            {type.label}
                            </button>
                        ))}
                        </div>
                    </div>
                    {mostRecent && 
                    <div className="flex items-center">
                        <p className="font-bold mr-2">Most Recent:</p>
                        <Link className="inline-block text-blue-600 underline" href={`${bobo.id}/session/${mostRecent.session_number}`}>
                            Session {mostRecent.session_number}{' '}{dayjs(mostRecent.date).format("MMMM DD, YYYY")}
                        </Link>
                    </div>}
                </div>
            </div>
    );
}
