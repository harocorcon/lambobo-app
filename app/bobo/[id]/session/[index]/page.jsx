import { getBoboSummary } from "@/app/actions/boboController";
import BoboCard from "@/app/components/BoboCard";

export default async function SessionPage({ params }){
    const { id, index } = await params;
    let boboDetails = await getBoboSummary(id);

    return(
        <>
            <BoboCard boboDetails={boboDetails} />
            <h1>Session Page</h1>

        </>
    )
}