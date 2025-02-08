'use server';

import { redirect } from "next/navigation";

export async function createBobo(prevState, formData){
    console.log(formData);
    return {
        error: "Incomplete details."
    }
}