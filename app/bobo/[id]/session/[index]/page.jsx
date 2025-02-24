import { getBoboSummary } from "@/app/actions/boboController";
import BoboCard from "@/app/components/BoboCard";
import SessionTabs from "./SessionTabs";

export default async function SessionPage({ params }){

    const { id, index } = await params;
    let boboDetails = await getBoboSummary(id);

    return(
        <div className="flex">
            <div className="justify-center items-center">
            <BoboCard boboDetails={boboDetails} />
            <SessionTabs boboDetails={boboDetails} index = {index}/>
            </div>
        </div>
    )
}