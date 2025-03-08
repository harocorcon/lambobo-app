'use server';

import { createClient } from "../utils/supabase/server";

export async function createLoan( loanData ){
    const { account_id, bobocycle_id, amount, session_number, applied_on } = loanData;
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    if (!data?.user) {
        redirect('/login');
    }
    console.log(account_id, bobocycle_id, amount, session_number, applied_on, "createLoan ", loanData)
    try {
        const { data, error } = await (await supabase)
                .from('loans')
                .insert([{
                        bobocycle_id: bobocycle_id,
                        account_id: parseInt(account_id, 10),
                        applied_on: applied_on,
                        amount: amount,
                        session_number: session_number,
                        is_active: true,
                        is_complete: true,
                    }])
                .select("*") 
                .single(); 
        if (error){
            console.error(error)
            return {error}
        }

        return {
            success: true,
            data: data,
            error: null,
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
            message: `Retrieved ${data?.length} loans.`
        }
    } catch(error){
        console.error(error)
    }
}

export async function updateLoan( loan ){
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    if (!data?.user) {
        redirect('/login');
    }
   
    const { loan_id, amount, session_number, applied_on } = loan;
    let is_active = true;
    if(amount === 0){
        is_active = false;
    }
    try {
        const { data, error } = await (await supabase)
                .from('loans')
                .update({amount, applied_on, session_number, is_active, is_complete: true}) 
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

export async function getTotalUnpaidLoans( id ) {
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    if (!data?.user) {
        redirect('/login');
    }

    try {
        const { data, error } = await (await supabase)
                .from('loans')
                .select('*')
                .eq('is_active', true)
                .eq('bobocycle_id', id)
    
        if (error){
            console.error(error)
        }

        const sum = data.reduce((accumulator, d) => {
            return accumulator + d.amount;
          }, 0);
    
        return sum ?? 0;
    } catch(error){
        console.error(error)
    }
}
