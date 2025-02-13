import { createClient } from "@/app/utils/supabase/server";
import AddAccount from "../../components/AddAccount"

import dayjs from "dayjs";

export default async function BoboPage({params}) {
    const { id } = await params;
    const supabase = createClient();
    const { data: userData } = await (await supabase).auth.getUser();
    
    const boboId = id;
    let bobo = {};

    if(userData.user){
        const { data, error} = await (await supabase)
                                .from('bobo_cycles')
                                .select('*')
                                .eq('id', boboId)
                                .eq('admin', userData.user.id)
        if(error){
            console.error('Error fetching from bobocycle', error);
        }
        const { types, err} = await (await supabase)
                                .from('transaction_types')
                                .select()
                                .eq('bobocycle_id', boboId)
        if(err){
            console.error('Error fetching from transaction_type', error);
        }
        console.log(boboId, "types please", types);
        bobo = data[0];
    }
    else {
        return (
            <h1> You are not authorized to go to this page.</h1>
        )
    }
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
                    className="block text-slate-600 leading-normal font-light mb-4">
                    <p className="text-xs">{getSchedule(bobo.startdate, bobo.duration)}</p>
                    <p>Interest: {bobo.interest}% per month</p>
                    <p>Members
                        {canAddMembers(bobo.startdate) && 
                        <span className="ml-4">
                            <button className=" hover:bg-red-300 bg-red-400 p-1 rounded-sm text-white text-xs"
                                >Add Account</button>
                        </span>}
                    </p>

                </div>
                <div name="account-form" id="account-form">
                    <AddAccount />
                </div>
            </div>
            {/* <AccountForm /> */}
            
        </div>
    )
}

const getSchedule = (start, length) => {
    return start + " to " + dayjs(start).add(length, "week").format("YYYY-MM-DD") + " ("+length+" weeks)"
}

const canAddMembers = (startdate) =>{
    return !dayjs().isAfter(startdate)
}