'use server';

import { revalidatePath } from "next/cache";
import { createClient } from "../utils/supabase/server";


export async function createBobo(prevState, formData){

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
        const { data, error } = await (await supabase).from('bobocycle').insert([
            {
                name: formData.get('title'),
                admin: user.id,
                duration: formData.get('duration'),
                interest: formData.get('interestRate'),
                isActive: true,
                startDate: formData.get('startDate')
            }
        ])
        if(error) throw error;
        revalidatePath('/');
        return {
            success: true,
            data: data
        }

    } catch(error){
        throw error
    }
    
}

const isUUID = (id) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };
  