import { getBoboSummary } from "@/app/actions/boboController";
import SessionTabs from "./SessionTabs";

export default async function SessionPage({ params }){

    const { id, index } = await params;
    let boboDetails = await getBoboSummary(id);

    return(
        <div className="flex">
            <div className="justify-center items-center">
            
            <SessionTabs boboDetails={boboDetails} index = {index}/>
            </div>
        </div>
    )
}