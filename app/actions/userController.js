'use server'

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server"
import { revalidatePath } from "next/cache";

export async function login(formData){
    console.log("login", formData)
    const supabase = createClient();
    const data = {
        email:formData.get('email'),
        password: formData.get('password')
    }

    const { error } = await (await supabase).auth.signInWithPassword(data);
    if(error){
        console.error(error)
        redirect('/error')
    }

    revalidatePath('/', 'layout');
    redirect('/');
}

export async function signup(formData){
    console.log("signup", formData)

    const supabase = createClient();
    const data = {
        email: formData.get('email'),
        password: formData.get('password')
    }
    const {error} = (await supabase).auth.signUp(data);
    if(error){
        console.error(error)
        redirect('/error')
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