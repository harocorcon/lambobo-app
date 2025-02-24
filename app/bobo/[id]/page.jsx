import { getBoboSummary } from "@/app/actions/boboController";
import AccountMenu from "../../components/AccountMenu";
import BoboCard from "../../components/BoboCard";
import { isUserValid } from "@/app/actions/userController";
import { redirect } from "next/dist/server/api-utils";
import BoboCalendar from "./BoboCalendar"
import dayjs from "dayjs";

export default async function BoboPage({ params }) {
    const { id } = await params;
    const boboDetails = await getBoboSummary(id);

    if(!isUserValid()){
        redirect("/login"); //Feb15 it redirects even without this
    }

    const canAddMembers = (startdate) =>{
        return !dayjs().isAfter(startdate)
    }

    return (
        <>
            <BoboCard boboDetails={boboDetails} />
            {/* {dayjs().isBefore(boboDetails.bobo.startdate) &&<AccountMenu boboDetails={boboDetails} canAddMembers={canAddMembers(boboDetails.bobo.startdate)}/>} */}
            <AccountMenu boboDetails={boboDetails} canAddMembers={true}/>
            <BoboCalendar boboDetails={boboDetails} />
        </>
    )
}

