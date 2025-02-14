'use server';

import { createClient } from "../utils/supabase/server";


export async function createAccounts(accounts, boboId){
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    if (!data?.user) {
        redirect('/login');
    }
    try {
        const { data, error } = await (await supabase)
                .from('accounts')
                .insert(
                    accounts.map((d) => ({
                        name : d.name,
                        phone : d.phone,
                        bobocycle_id: boboId
                    }))
                )
    
        if (error){
            console.error(error)
        }
    
    
        return {
            success: true,
            data: data,
            message: "Accounts Saved."
        }
    
    } catch(error){
        console.error(error)
    }


}