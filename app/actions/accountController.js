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

export async function countAccounts(boboId){
    const supabase = createClient(); // Initialize your Supabase client

    try {
        const { count, error } = await (await supabase)
        .from('accounts')
        .select('*', { count: 'exact' }) // Select all (or specific columns) and count
        .eq('bobocycle_id', boboId); // Filter by boboId

        if (error) {
            console.error("Error fetching account count:", error);
            return 0; // Or handle the error as needed
        }
console.log("countaccounts ", count);
        return count; // Return the count (will be a number)
    } catch (error) {
        console.error("Unexpected error:", error);
        return 0; // Handle errors
    }
}