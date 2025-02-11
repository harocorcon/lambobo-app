'use server';

import { revalidatePath } from "next/cache";
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
            .from('bobocycle')
            .insert([
            {
                name: formData.title,
                admin: user.id,
                duration: formData.duration,
                interest: formData.interestRate,
                isActive: true,
                startDate: formData.startDate
            }
            ])
            .select("*")  // ✅ Fetch inserted row
            .single();   // ✅ Return only one row
        
        if(boboError) throw error;

        const boboId = boboData.id;
        const {transactionTypes} = formData;

        const { data: tranTypesData, error: tranTypesError} = await (await supabase)
            .from('transaction_type')
            .insert(
                transactionTypes.map((t) => ({
                    bobocycle_id: boboId,
                    label: t.label,
                    amount: t.amount == "depende"? 0: t.amount,
                    isOptional: t.isOptional,
                }))
            )

        if (tranTypesError) throw tranTypesError;

        console.log(boboData, "createbobo saved ", tranTypesData)
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

  