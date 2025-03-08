'use server';

import { createClient } from "../utils/supabase/server";
import { getTransactionTypes } from "./boboController";


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

export async function resolveTransaction( transaction_id ){
    console.log("resolve this transaction: ", transaction_id);
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    if (!data?.user) {
        redirect('/login');
    }
    try {
        const { data, error } = await (await supabase)
                .from('transactions')
                .update({status: 1})
                .eq('id', transaction_id)
    
        if (error){
            console.error(error)
        }
        return {
            success: true,
            data: data,
            message: "One transaction is updated."
        }
    
    } catch(error){
        console.error(error)
    }
}

export async function getTransactionByAccountPerSession( details ){
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

export async function getTransactionsBySession(bobocycle_id, session_number){
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
        
        if(error){
            console.error("Error in fetching transactions for session#", session_number, error)
            return;
        }

        return {
            success: true,
            data: transactions,
            message: "Retrieved transactions for session ", session_number
        }
    } catch(error){
        console.error("Error in fetching transactions for account#", error)
    }
}

export async function getTotalTransactionAmountByAccount(account_id, status){
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    if (!data?.user) {
        redirect('/login');
    }
    try {
        const { data: transactions, error } = await (await supabase)
                .from('transactions')
                .select('amount') 
                .eq('account_id', account_id)
                .eq('status', status)
        
        if(error){
            console.error("Error in fetching transactions for session#", session_number, error)
            return;
        }
        if (!transactions || transactions.length === 0) {
            return 0
        }
        
        const sum = transactions.reduce((accumulator, transaction) => {
          return accumulator + transaction.amount;
        }, 0); // Initialize accumulator to 0
        
        return sum;
    } catch(error){
        console.error("Error in fetching transactions for account#", error)
    }
}

export async function computeAllTransactions(id){
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    if (!data?.user) {
        redirect('/login');
    }
    try {
        const {data: types} = await getTransactionTypes(id);
        const totalByTtype = types.map(({ id, label }) => ({ id, label, total: 0 }));

        let allTransactions = [];
        let from = 0;
        let to = 999;
        let fetching = true;

        while(fetching){
            const { data, error } = await (await supabase)
                    .from('transactions')
                    .select('*') 
                    .eq('bobocycle_id', id)
                    .range(from, to);
            
            if(error){
                console.error("Error in fetching transactions for session#", session_number, error)
                return null;
            }
            allTransactions = allTransactions.concat(data);
            fetching = !(data.length < (to - from + 1) || data.length === 0)
            from = to + 1;
            to = to + 1000;
        }
        
        let missedCount = 0;

        allTransactions && allTransactions.forEach(transaction => {
            const type = totalByTtype.find(type => type.id === transaction.ttype_id);
            if (transaction.status == 1 && transaction.amount > 0) {
              type.total += transaction.amount;
            }
            else{
                missedCount += 1;
            }
        });

        console.log(missedCount, allTransactions.length, "typessss in computing transactions..... ", totalByTtype)
        return {
            totalByTtype, missedCount
        }
    } catch(error){
        console.error("Error in computing all transactions", error)
    }
}
