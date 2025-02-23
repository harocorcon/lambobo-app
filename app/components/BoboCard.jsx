import dayjs from "dayjs";
import Link from "next/link";

export default function BoboCard({ boboDetails }) {
    const { bobo, accountsCount, types } = boboDetails;
    const getSchedule = (start, length) => {
        let end = dayjs(start).add(length, "week").format("YYYY-MM-DD");
        return dayjs(start).format('MMMM DD, YYYY') + " to " + dayjs(end).format('MMMM DD, YYYY') + " ("+length+" weeks)"
    }

    return (
        <Link href={`/bobo/${bobo.id}`}>
            <div className="justify-center flex flex-col my-8 bg-white shadow-sm hover:shadow-md border border-slate-200 rounded-lg max-w-md p-6">
                <div className="flex items-center mb-2">
                    <h5 className=" text-slate-800 text-xl font-semibold">
                        {bobo.name}
                    </h5>
                    
                </div>

                <div name="bobo-details"
                    className="block text-slate-600  text-xs leading-normal font-light mb-4">
                    <p className="text-xs">{getSchedule(bobo.startdate, bobo.duration)}</p>
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
                </div>
            </div>
        </Link>
    );
}
