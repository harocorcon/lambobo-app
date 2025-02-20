import { getBoboSummary } from "@/app/actions/boboController";
import BoboCard from "@/app/components/BoboCard";
import SessionTabs from "./SessionTabs";
import { addWeeks, format } from "date-fns";


export default async function SessionPage({ params }){
    const { id, index } = await params;
    let boboDetails = await getBoboSummary(id);
    let sessionDate = addWeeks(await boboDetails.bobo.startdate, index - 1);

    return(
        <div className="flex">
            <div className="justify-center items-center">
            <BoboCard boboDetails={boboDetails} />
            <h1 className="mx-auto">Session #{index} {format(sessionDate, 'MMMM d, yyyy')}</h1>
            <SessionTabs boboDetails={boboDetails} index = {index}/>
            </div>
        </div>
    )
}