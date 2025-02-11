'use client'

import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { login, signup } from "../actions/userController";

export default function Login() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [clickedSignUp, setClickSignUp] = useState(false);
    const [loginState, loginAction] = useActionState(login, {});
    const [signUpState, signUpAction] = useActionState(signup, {});

    const formAction = isSignUp? signUpAction: loginAction;
    const formState = isSignUp? signUpState: loginState;
    
    const formHeader = isSignUp? 'Create an Account': 'Log in to your account';
    const buttonText = isSignUp? 'Sign up': 'Login';

    return (
        <div>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image src="/lambobo-logo-3.svg" width={60} height={60} className="mx-auto h-10 w-auto" alt="Lambobo Logo" />
                <h2 className="mt-4 text-center text-2xl/9 font-bold tracking-tight text-gray-700">
                    {formHeader}
                </h2>
                </div>
            </div>

            <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                <form action={formAction} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-700">Email address</label>
                        <div className="mt-2">
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                autoComplete="email" 
                                required 
                                className="block w-full rounded-md bg-gray-400 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-700">Password</label>
                        {/* <div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                        </div> */}
                        </div>
                        <div className="mt-2">
                        <input type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-gray-400 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                        </div>
                    </div>
                    {
                        isSignUp && clickedSignUp && 
                        <div className="text-center">Sign up link sent. Go confirm your email.</div>
                    }
                    {
                        !isSignUp && formState.error &&
                        <div><p className="text-sm text-center text-red-600">{formState.error}</p></div>
                    }

                    <div>
                            <button 
                                type="submit" 
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => setClickSignUp(!clickedSignUp)}
                                >{buttonText}
                            </button>
                    </div>

                    <div className="text-center">
                    {
                            <p className="items-center justify-center text-sm font-light text-gray-500 dark:text-gray-400"> 
                                {isSignUp? "Already have an account? ":"Don't have an account? "}
                                <button className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                                    onClick={() => setIsSignUp(!isSignUp)}
                                >
                                    {isSignUp? 'Login': 'Sign up'}
                                </button>
                            </p>
                    }
                    </div>
                </form>

            </div>
        </div>
    )
}