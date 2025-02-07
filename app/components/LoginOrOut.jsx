import Link from "next/link";
import { createClient } from "../utils/supabase/server";
import { logout } from "../actions/userController";


export default async function LoginOrOut() {
    const supabase = createClient();
    const { data } = await (await supabase).auth.getUser();

    if(data.user){
        return (
            <div>
                <button
                    onClick={logout}
                    className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                    Log out
                </button>
            </div>
        )
    }

    return (
        <div>
            <Link href="/login" 
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >Log in
            </Link>
        </div>
    )

}