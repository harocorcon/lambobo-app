'use client';

import { useState } from "react";


export default function AccountCard({ total, missed, account, loan }) {

    return(
        <>
        <div className="justify-center items-center flex flex-col my-8 bg-white shadow-sm hover:shadow-md border border-slate-200 rounded-lg max-w-md p-6">
            <div className="flex flex-col items-center justify-center mb-2">
                {account && <h5 className="tracking-wider text-slate-800 text-4xl font-bold">
                    {account.name}
                </h5>}
            </div>

            <table className="text-slate-600 table-auto w-[80%] mx-auto">
                <tbody className="space-y-2">
                    <tr>
                        <td className="py-1 font-bold">Total Contribution:</td>
                        <td className="py-1 text-right">{total}</td> 
                    </tr>
                    <tr>
                        <td className="py-1 font-bold">Current Loan:</td>
                        <td className="py-1 text-right">
                            {loan.amount ?? 0 }
                        </td> 
                    </tr>
                    <tr>
                        <td className="py-1 font-bold">Missed Payments:</td>
                        <td className="py-1 text-right">
                            {missed }
                        </td> 
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}