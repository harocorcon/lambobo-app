'use server'

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server"
import { revalidatePath } from "next/cache";

export async function login(prevState, formData){
    const supabase = await createClient();

    try{
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.get('email'),
            password: formData.get('password')
        });

        if (error) {
            console.error('Error during login:', error.message);
            return {
                success: false,
                error: error.message
            }
        } else {
        console.log('User signed in:', data);
        }
    } catch(err){
        console.error("Unexpected err", err)
    }

    revalidatePath('/', 'layout');
    redirect('/');
}

export async function signup(prevState, formData){
    const supabase = await createClient();
    const data = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    const {error} = await supabase.auth.signUp(data);
    if(error){
        return {
            success: false,
            error: error.message
        }
    }

    return {
        success: true,
        message: "Account created"
    }

}

export async function logout(){
    const supabase = createClient()
    const { error } = await (await supabase).auth.signOut();

    if(error){
        redirect('/error')
    }

    revalidatePath('/login')
    revalidatePath('/')
}

export async function isUserValid() {
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();

    return data.user;
}