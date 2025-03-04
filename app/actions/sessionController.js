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

export async function checkIfSessionExists(bobocycle_id, session_number){
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    
    if (!data?.user) {
        redirect('/login');
    }
    try {
        const { data, error } = await (await supabase)
                .from('sessions')
                .select("*") 
                .eq('bobocycle_id', bobocycle_id)
                .eq('session_number', session_number)
        
        console.log("session found! ", data)
        if (error){
            console.error(error)
        }
        return data;
    } catch(error){
        console.error(error)
        return {
            success: false,
            data: [],
            message: "Error in looking for this session."
        }
    }
}