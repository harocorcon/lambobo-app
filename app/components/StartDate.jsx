'use client';
import { useState } from "react";
import "react-datetime/css/react-datetime.css"
import moment from "moment";
// import DatePicker from "react-datepicker";
import Datetime from "react-datetime";

export default function StartDate({ setStartDate }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(moment(date).format("YYYY-MM-DD"));
        console.log(moment(date).format("YYYY-MM-DD"));
        setStartDate(moment(date).format("YYYY-MM-DD"));
    }

    return (
        <div>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                Start Date
            </label>
            <div className="relative max-w-sm">
                {/* Icon */}
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </div>

                <Datetime              
                    className="w-full appearance-none shadow border rounded py-3 px-12 text-gray-700 "
                    selected={selectedDate}
                    value={selectedDate}
                    onChange={handleDateChange}
                    placeholder="Unsa petsaha magsugod diay"
                    initialViewMode="days" 
                    dateFormat="YYYY-MM-DD"
                    timeFormat={false} 
                    popperPlacement="bottom-start" 
                    portalId="root"
                />
            </div>
        </div>
    )
}