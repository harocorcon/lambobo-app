import dayjs from "dayjs";
import { getBoboCycle, getBoboSummary, getTransactionTypes } from "@/app/actions/boboController";
import AccountMenu from "../../components/AccountMenu";
import BoboCard from "../../components/BoboCard";

export default async function BoboPage({ params }) {
    const { id } = await params;
    const boboDetails = await getBoboSummary(id);
  
    return (
        <>
            <BoboCard boboDetails={boboDetails} />
            <AccountMenu bobo={boboDetails.bobo} />
        </>
    )
}

