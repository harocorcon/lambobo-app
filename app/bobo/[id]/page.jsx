import { getBoboSummary } from "@/app/actions/boboController";
import AccountMenu from "../../components/AccountMenu";
import BoboCard from "../../components/BoboCard";
import { isUserValid } from "@/app/actions/userController";
import { redirect } from "next/dist/server/api-utils";

export default async function BoboPage({ params }) {
    const { id } = await params;
    const boboDetails = await getBoboSummary(id);

    if(!isUserValid()){
        redirect("/login"); //Feb15 it redirects even without this
    }
  
    return (
        <>
            <BoboCard boboDetails={boboDetails} />
            <AccountMenu boboDetails={boboDetails} />
        </>
    )
}

