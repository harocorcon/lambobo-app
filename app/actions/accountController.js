'use server';

import { createClient } from "../utils/supabase/server";


export async function createAccounts(accounts, boboId){
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    if (!data?.user) {
        redirect('/login');
    }
    // verify that the last element is not empty
    if(accounts[accounts.length-1].name=='')
        accounts = accounts.slice(0, accounts.length-1);
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
    const supabase = createClient();
    try {
        const { count, error } = await (await supabase)
        .from('accounts')
        .select('*', { count: 'exact' }) 
        .eq('bobocycle_id', boboId); 

        if (error) {
            console.error("Error fetching account count:", error);
            return 0; 
        }
        return count; 
    } catch (error) {
        console.error("Unexpected error:", error);
        return 0; 
    }
}

export async function getBoboAccounts(boboId){ // getAccountsByBobo
    const supabase = createClient();
    try {
        const { data: accounts, error } = await (await supabase)
        .from('accounts')
        .select('*') 
        .eq('bobocycle_id', boboId); 

        if (error) {
            console.error("Error fetching account count:", error);
            return 0; 
        }
        return accounts; 
    } catch (error) {
        console.error("Unexpected error:", error);
        return 0; 
    }
}

export async function deleteAllAccounts(boboId){
    const supabase = createClient();
    try {
        const { error: deleteError } = await (await supabase)
            .from('accounts')
            .delete()
            .eq('bobocycle_id', boboId);

        if (deleteError) {
            console.error("Error deleting existing accounts:", deleteError);
            return; 
        }

        } catch (error) {
            console.error("Error saving accounts:", error);
        } finally {
        }   
}

export async function getAccountById( id ){
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    if (!data?.user) {
        redirect('/login');
    }
    try{
        const { data: account, error } = await (await supabase).from('accounts')
                                .select('*')
                                .eq('id', id)
                                .single();
        if(error){
            console.error("Dili pa fetch, iyaton ning getAccountById ", error);
            return {};
        }
        return account;

    }catch(error){
        console.error("Error in fetching this account. ", id, error)
    }
}