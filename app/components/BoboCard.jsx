import dayjs from "dayjs";
import { createClient } from "../utils/supabase/server"


export default async function BoboCards() {
    const supabase = createClient();
    const { data: userData } = await (await supabase).auth.getUser();
    let bobocycles = [];

    if(userData.user){
        const { data, error} = await (await supabase).from('bobocycle').select('*');
        if(error){
            console.error('Error fetching from database', error);
        }
        bobocycles = data;
    }
    console.log(bobocycles);
    let header = !bobocycles.length? 'You have not created any Bobo cycle yet':
            !userData.user? 'Login to see your bobo list':
            'Boobo Cycle List'
    return (
        <div className="h-screen">
            {/* <h1 className="grid grid-cols-1 sm:grid-cols-2 gap-4  p-10 pt-28">
                List</h1> */}

            <ul>
                {bobocycles.map((bobo) => (
                    <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 p-6">
                    
                        <div className="flex items-center mb-2">
                            <h5 className=" text-slate-800 text-xl font-semibold">
                                {bobo.name}
                            </h5>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 ml-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </div>

                        <div name="bobo-details"
                            className="block text-slate-600 leading-normal font-light mb-4">
                            <p className="text-xs">{getSchedule(bobo.startDate, bobo.duration)}</p>
                            <p>Interest: {bobo.interest}% per month</p>
                            <p>Members</p>
                        </div>
                        
                </div>
                ))}
            </ul>

        </div>
    )
}

const getSchedule = (start, length) => {
    return start + " to " + dayjs(start).add(length, "week").format("YYYY-MM-DD") + " ("+length+" weeks)"
}