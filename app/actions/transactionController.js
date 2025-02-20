'use server';

import { createClient } from "../utils/supabase/server";


export async function createTransactions( transactions ){
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    if (!data?.user) {
        redirect('/login');
    }
        console.log("controller/createTransactions" ,transactions);
    try {
        const { data, error } = await (await supabase)
                .from('transactions')
                .insert(
                    transactions.map((t) => ({
                        bobocycle_id: t.bobocycle_id,
                        account_id: t.account_id,
                        ttype_id: t.ttype_id,
                        date: t.date,
                        amount: t.amount,
                        status: t.status,
                        session_number: t.session_number,
                    }))
                )
    
        if (error){
            console.error(error)
        }
    
    
        return {
            success: true,
            data: data,
            message: "Transactions Saved."
        }
    
    } catch(error){
        console.error(error)
    }


}
