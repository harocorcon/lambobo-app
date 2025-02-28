'use server';

import { createClient } from "../utils/supabase/server";

export async function createSession(session){
    console.log("controller...session")
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    
    if (!data?.user) {
        redirect('/login');
    }
    try {
        const { data, error } = await (await supabase)
                .from('sessions')
                .insert([session])
                .select("*") 
                .single();

        if (error){
            console.error(error)
        }
            
        return {
            success: true,
            data: data,
            message: "A record is saved in sessions table."
        }
            
    } catch(error){
        console.error(error)
        return {
            success: false,
            data: [],
            message: "Error in saving session."
        }
    }
}