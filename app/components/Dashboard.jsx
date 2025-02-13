import Link from "next/link";
import BoboCard from "./BoboCard";

export default function Dashboard() {
    return (
        <>
        <div className="flex flex-col justify-center mx-auto m-6 items-center">
            <Link href="/create-bobo">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    // onClick={createBobo}
                >
                    Create Bobo Cycle
                </button>
            </Link>

            <BoboCard />

            

        </div>
</>
    )
}