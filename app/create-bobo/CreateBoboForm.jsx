
import { useEffect, useState } from "react"
import StartDate from "../components/StartDate"
import moment from "moment";
import { Button } from "@/components/ui/button";


export default function CreateBoboForm({nextStep, updateFormData, formData}) {
    const [startDate, setStartDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const initialData = {
        duration: 25,
        startDate,
        interestRate: 10,
    }
    const[isMissingTitle, setIsMissingTitle] = useState(false);

    useEffect(()=>{
        updateFormData(initialData);
    },[])

    useEffect(()=>{
        if(formData.title)
            setIsMissingTitle(false);
    },[formData.title])

    const handleChange = (field, value) => {
        updateFormData({
            [field]: value
        });
    };

    const handleSubmit = () => {
        if(formData.title==''){
            setIsMissingTitle(true);
            return;
        }
        nextStep();
    }
    
    return (
        <div className="w-full max-w-sm mx-auto space-y-4 shadow p-6 Pb-6">
            <div className="flex flex-wrap items-center border-b border-teal-500">
                    <input 
                        required 
                        className="appearance-none bg-transparent border-none w-full text-gray-800 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                        type="text" 
                        placeholder="Title" 
                        aria-label="Title"
                        autoComplete="title"
                        id="title"
                        name="title"
                        onChange={(e) => handleChange("title", e.target.value)}
                        value={formData['title']}
                        />
                        
                </div>
                <div className="w-full mt-2">

                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                        Duration
                    </label>
                    <div className="relative">
                        <select 
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="grid-state"
                            name="duration"
                            default={25}
                            value={formData['duration']}
                            onChange={(e) => handleChange("duration", e.target.value)}>
                                <option value="25">25 weeks</option>
                                <option value="52">52 weeks</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>

                    <div className="w-full mt-2">
                        
                        <StartDate formData={formData} updateFormData={updateFormData}/>
                        <input type="hidden" name="startDate" value={formData['startDate']}
                            onChange={(e) => handleChange("startDate", startDate)} />
                    </div>

                    <div className="w-full mt-2">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                            Interest Rate
                        </label>

                        <div className="relative">
                            <select
                                name="interestRate" 
                                id="interest-rate" 
                                default={10}
                                value={formData['interestRate']}
                                onChange={(e) => handleChange("interestRate", e.target.value)}
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                    <option value="10">10% kada buwan</option>
                                    <option value="15">15% kada buwan</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                </div>
                
                { isMissingTitle && (
                    <p className="text-center p-0 m-0 text-red-600 text-sm">Title is missing.</p>
                )}
                <div className="pt-2 relative p-4">
                    <Button className="absolute right-0 -top-6 bg-blue-500 hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded"
                        onClick={handleSubmit}
                        >{'>>'}</Button>
                </div>
                {/* </form> */}
        </div>
    )
}