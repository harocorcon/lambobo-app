'use server';

import { createClient } from "../utils/supabase/server";

export async function createLoan( loanDetails ){
    const { bobo_id, account_id, amount, date, session_number } = loanDetails;
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    if (!data?.user) {
        redirect('/login');
    }
    try {
        const { data, error } = await (await supabase)
                .from('loans')
                .insert([{
                        bobocycle_id: bobo_id,
                        account_id: account_id,
                        applied_on: date,
                        amount: amount,
                        status: "active",
                        session_number: session_number,
                        isActive: true,
                        isComplete: true,
                    }]
                )
    
        if (error){
            console.error(error)
        }
    
    
        return {
            success: true,
            data: data,
            message: "Loans Saved."
        }
    
    } catch(error){
        console.error(error)
    }
}


export async function getLoansByBobo( bobo_id ){
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    if (!data?.user) {
        redirect('/login');
    }

    try {
        const { data, error } = await (await supabase)
                .from('loans')
                .select('*') 
                .eq('bobocycle_id', bobo_id); 
    
        if (error){
            console.error(error)
        }
    
    
        return {
            success: true,
            data: data,
            message: `Retrieved ${data.length} loans.`
        }
        console.log("Retrieved ${data.length} loans.")
    } catch(error){
        console.error(error)
    }
}