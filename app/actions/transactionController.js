'use server';

import { createClient } from "../utils/supabase/server";


export async function createTransactions( transactions ){
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    if (!data?.user) {
        redirect('/login');
    }
    const filteredTransactions = transactions.filter((t) => t.status !== -1)
    try {
        const { data, error } = await (await supabase)
                .from('transactions')
                .insert(
                    filteredTransactions
                    .map((t) => ({
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
        return {
            success: false,
            data: [],
            message: "Error in saving transactions."
        }
    }
}

export async function getAllTransactionsByAccount( id ){
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    if (!data?.user) {
        redirect('/login');
    }
    try {
        const { data: transaction, error } = await (await supabase)
                .from('transactions')
                .select('*') 
                .eq('account_id', id)
        
        if(error){
            console.error("Error in fetching transactions for account#", id, error)
            return [];
        }

        return {
            success: true,
            data: transaction,
            message: "Retrieved transactions for id", id
        }
    } catch(error){
        console.error("Error in fetching transactions for account#", id, error)
    }
}

export async function createTransaction( transactions ){
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    if (!data?.user) {
        redirect('/login');
    }
    const filteredTransactions = transactions.filter((t) => t.status !== -1)
    console.log("filtered? ", filteredTransactions.length)
    try {
        const { data, error } = await (await supabase)
                .from('transactions')
                .insert(
                    filteredTransactions.map((t) => ({
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

export async function getTransactionByAccountPerSession( details ){
    // console.log("details: ", details)
    const { account_id, session_number, bobocycle_id, ttype_id } = details;
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    if (!data?.user) {
        redirect('/login');
    }
    try {
        const { data: transaction, error } = await (await supabase)
                .from('transactions')
                .select('*') 
                .eq('account_id', account_id)
                .eq('session_number', session_number)
                .eq('bobocycle_id', bobocycle_id)
                .eq('ttype_id', ttype_id)

        console.log("transaction found!! ", transaction)
        
        if(error){
            console.error("Error in fetching transactions for account#", account_id, error)
            return;
        }

        return {
            success: true,
            data: transaction,
            message: "Retrieved transaction for id", account_id
        }
    } catch(error){
        console.error("Error in fetching transactions for account#", error)
    }
}

export async function getTransactionsBySession(details){
    const {bobocycle_id, session_number} = details
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    if (!data?.user) {
        redirect('/login');
    }
    try {
        const { data: transactions, error } = await (await supabase)
                .from('transactions')
                .select('*') 
                .eq('session_number', session_number)
                .eq('bobocycle_id', bobocycle_id)

        console.log("transactions found!! ", transactions)
        
        if(error){
            console.error("Error in fetching transactions for account#", account_id, error)
            return;
        }

        return {
            success: true,
            data: transactions,
            message: "Retrieved transaction for id", account_id
        }
    } catch(error){
        console.error("Error in fetching transactions for account#", error)
    }
}
