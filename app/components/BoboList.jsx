'use client'

import dayjs from "dayjs";
import { getAllBoboSummary } from "../actions/boboController";
import { useEffect, useState } from "react";
import { isUserValid } from "../actions/userController";
import BoboCard from "./BoboCard";


export default function BoboList() {
    const [boboDetails, setBoboDetails] = useState([]);

    useEffect(()=>{
        async function fetchData() {
            if (!isUserValid()) {
                redirect('/login');
            }
        
            try {
                const data = await getAllBoboSummary();
                setBoboDetails(data);
            } catch (error) {
                console.error("Error fetching bobo details:", error);
            }
            }
      
        fetchData();
    }, []);

    let header = !boboDetails.length? 'You have not created any Bobo cycle yet':
            'Bobo Cycle List'
    return (
        <div className="h-screen">
            <h1 className="text-xl font-extrabold mx-auto p-3">{header}</h1>
                
                {boboDetails.map((detail, key) => (
                    <div key={key}>
                        <BoboCard boboDetails={detail}/>
                    </div>
                ))}
            

        </div>
    )
}
