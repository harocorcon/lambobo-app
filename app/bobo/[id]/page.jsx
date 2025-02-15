import dayjs from "dayjs";
import { getBoboCycle, getTransactionTypes } from "@/app/actions/boboController";
import AccountMenu from "../../components/AccountMenu";

export default async function BoboPage({ params }) {
    const { id: boboId } = await params;
    const { data: bobo } = await getBoboCycle(boboId)

    const { data: types} = await getTransactionTypes(boboId);
    const typeLabels = types && Array.isArray(types)? types.map(type => type.label): [];
  
    return (
        <div >
            <div className="justify-center flex flex-col my-8 bg-white shadow-sm hover:shadow-md border border-slate-200 rounded-lg w-110 p-6">
                <div className="flex items-center mb-2">
                    <h5 className=" text-slate-800 text-xl font-semibold">
                        {bobo.name}
                    </h5>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 ml-2 hover:text-green-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </div>

                <div name="bobo-details"
                    className="block text-slate-600  text-xs leading-normal font-light mb-4">
                    <p className="text-xs">{getSchedule(bobo.startdate, bobo.duration)}</p>
                    <p className="font-bold">Interest: <span className="font-normal">{bobo.interest}% per month</span></p>

                    <div className="flex items-center">
                        <p className="font-bold  mr-2">Transactions:</p>
                        <div className="flex flex-wrap gap-2"> {/* Use flexbox for layout */}
                        {typeLabels.map((type, key) => (
                            <button
                                key={key}
                                className="bg-sky-100 hover:bg-sky-200 text-gray-700 font-medium rounded-xl text-xs px-2 py-0 border border-gray-200" 
                            >
                            {type}
                            </button>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
            
            <AccountMenu bobo={bobo} />
        </div>
    )
}

const getSchedule = (start, length) => {
    return start + " to " + dayjs(start).add(length, "week").format("YYYY-MM-DD") + " ("+length+" weeks)"
}
