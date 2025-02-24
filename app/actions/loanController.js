'use server';

import { createClient } from "../utils/supabase/server";

export async function createLoan( loanData ){
    const { account_id, bobocycle_id, amount, session_number, applied_on } = loanData;
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    if (!data?.user) {
        redirect('/login');
    }
    try {
        const { data, error } = await (await supabase)
                .from('loans')
                .insert([{
                        bobocycle_id: bobocycle_id,
                        account_id: account_id,
                        applied_on: applied_on,
                        amount: amount,
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
            message: "Loan Saved."
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
                .eq('bobocycle_id', bobo_id) 
                .eq('is_active', true); 
    
        if (error){
            console.error(error)
        }
    
    
        return {
            success: true,
            data: data,
            message: `Retrieved ${data.length} loans.`
        }
    } catch(error){
        console.error(error)
    }
}

export async function getLoanByAccount( account_id ){
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    if (!data?.user) {
        redirect('/login');
    }

    try {
        const { data, error } = await (await supabase)
                .from('loans')
                .select('*') 
                .eq('account_id', account_id) 
                .eq('is_active', true)
                .single(); 
    
        if (error){
            console.error(error)
        }
    
        return {
            success: true,
            data: data,
            message: `Retrieved ${data.length} loans.`
        }
    } catch(error){
        console.error(error)
    }
}

export async function updateLoan(loanData){
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    if (!data?.user) {
        redirect('/login');
    }
    const { id: loan_id, amount, session_number, applied_on } = loanData;
    console.log(loan_id, "controller ", loanData)
    try {
        const { data, error } = await (await supabase)
                .from('loans')
                .update({amount, applied_on, session_number, is_active: true, is_complete: true}) 
                .eq('id', loan_id)
        if (error){
            console.error(error)
        }
    
        return {
            success: true,
            data: data,
            message: `Updated loan.`+ loan_id
        }
    } catch(error){
        console.error(error)
    }


}
