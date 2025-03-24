import { getBoboSummary } from "@/app/actions/boboController";
import { getMostRecentSession } from "@/app/actions/sessionController";
import AccountMenu from "../../components/AccountMenu";
import BoboCard from "../../components/BoboCard";
import { isUserValid } from "@/app/actions/userController";
import { redirect } from "next/dist/server/api-utils";
import BoboCalendar from "./BoboCalendar"
import dayjs from "dayjs";
import AccountsSection from "./bahinay/AccountsSection";
import { getBoboAccounts } from "@/app/actions/accountController";

export default async function BoboPage({ params }) {
    const { id } = await params;
    const boboDetails = await getBoboSummary(id);
    const session = await getMostRecentSession(id);
    const accounts = await getBoboAccounts(id);

    if(!isUserValid()){
        redirect("/login"); //Feb15 it redirects even without this
    }

    const canAddMembers = (startdate) =>{
        return !dayjs().isAfter(startdate)
    }

    return (
        <div className="flex flex-col mx-auto items-center">
            <BoboCard className="mx-auto" boboDetails={boboDetails} mostRecent={session} />
            <BoboCalendar className="mx-auto" boboDetails={boboDetails} />
            {/* {(dayjs().isBefore(boboDetails.bobo.startdate) || dayjs().isSame(boboDetails.bobo.startdate)) && <AccountMenu boboDetails={boboDetails} canAddMembers={canAddMembers(boboDetails.bobo.startdate)}/>} */}
            <AccountMenu boboDetails={boboDetails} canAddMembers={true}/>
            {accounts > 0 && dayjs().isAfter(boboDetails.bobo.startdate) && <AccountsSection bahin={0} accounts={accounts} />}
        </div>
    )
}

