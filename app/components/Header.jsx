import Image from "next/image";
import LoginOrOut from "./LoginOrOut";



export default async function Header() {

    return(
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 shadow">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="/" className="flex items-center">
                        <Image src="/lambobo-logo-3.svg" width={40} height={40} alt="Lambobo logo" className="mr-3 h-6 fill-green-950 sm:h-9" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Lambobo</span>
                    </a>
                

                    <div className="flex items-center lg:order-2 justify-end">
                        <LoginOrOut />
                    </div>
                </div>
            </nav>
            
        </header>
    )
}