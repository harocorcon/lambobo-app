'use server';

import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";


export async function createBobo(formData){
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();
    const user = data.user;
    if(!user){
        return {
            success: false,
            error: "Must be an authenticated user to perform this action."
        }
    }
    try {
        const { data: boboData, error: boboError } = await (await supabase)
            .from('bobo_cycles')
            .insert([
            {
                name: formData.title,
                admin: user.id,
                duration: formData.duration,
                interest: formData.interestRate,
                isActive: true,
                startdate: formData.startDate
            }
            ])
            .select("*")  // ✅ Fetch inserted row
            .single();   // ✅ Return only one row
        
        if(boboError) throw boboError;

        const boboId = boboData.id;
        const {transactionTypes} = formData;

        const { data: tranTypesData, error: tranTypesError} = await (await supabase)
            .from('transaction_types')
            .insert(
                transactionTypes.map((t) => ({
                    bobocycle_id: boboId,
                    label: t.label,
                    amount: t.amount == "depende"? 0: t.amount,
                    isOptional: t.isOptional,
                }))
            )

        if (tranTypesError) throw tranTypesError;

        redirect("/")

        return {
            success: true,
            data: data,
            message: "Bobo Saved."
        }

    } catch(error){
        throw error
    }
    
}

export async function getBoboCycle(boboId){
    const supabase = createClient();
    const { data: userData } = await (await supabase).auth.getUser();
    
    if (!userData?.user) { // Simplified check for user
      redirect('/login');
    }

    const { data: bobo, error } = await (await supabase)
                            .from('bobo_cycles')
                            .select('*')
                            .eq('id', boboId)
                            .eq('admin', userData.user.id)
                            .single();

    if (error) {
        console.error('Error fetching from bobocycle', error);
        }
    return { data: bobo, error: null }
} 

export async function getTransactionTypes(boboId){
    const supabase = createClient();
    const { data: types, error: err } = await (await supabase)
                                        .from('transaction_types')
                                        .select()
                                        .eq('bobocycle_id', boboId);
    if(err)
        console.error(err);
    return { data: types, error: null }
}

  