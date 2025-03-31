'use client';

import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {
  add,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  subMonths,
} from 'date-fns'
import Link from "next/link";


export default function BoboCalendar({ boboDetails }){
    const { bobo } = boboDetails;
    const [sessions, setSessions] = useState([{session: 0, sessionDate: bobo.startdate}]);

    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    })

    useEffect(() => {
        let sessions = generateSessions(bobo.startdate, bobo.duration)
        setSessions(sessions)
    }, [boboDetails]);


    const generateSessions = (start, duration) => {
        const sessions = [];
        let currentDate = dayjs(start).startOf('isoWeek');

        for (let i = 0; i <= duration; i++) {
            sessions.push({
                sessionNumber: i + 1,
                sessionDate: currentDate.format('YYYY-MM-DD'),
            }
        );
            currentDate = currentDate.add(1, 'week');
        }

        return sessions;
    }

    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }
    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    const handleDate = (day) => {
        setSelectedDay(day);
    }

    const isSessionDay = (day) => {
        let session = sessions.findIndex((session) => isEqual(day, dayjs(session.sessionDate)));
        return session;
    }

    return (
        <div className="pt-8">
        <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
            <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
                <div className="">
                    <div className="flex items-center">
                        <h2 className="flex-auto font-semibold text-gray-900">
                        {format(firstDayCurrentMonth, 'MMMM yyyy')}
                        </h2>
                        <button
                        type="button"
                        onClick={previousMonth}
                        disabled={isSameMonth(currentMonth, subMonths(format(bobo.startdate, 'MMM-yyyy'), 1))}
                        className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                        <span className="sr-only">Previous month</span>
                        <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                        </button>
                        <button
                        onClick={nextMonth}
                        disabled={isSameMonth(currentMonth, addMonths(format(sessions[sessions.length - 1].sessionDate, 'MMM-yyyy'), 1))}
                        type="button"
                        className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                        <span className="sr-only">Next month</span>
                        <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                        <div>S</div>
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                    </div>

                    <div className="grid grid-cols-7 mt-2 text-sm">
                        {days.map((day, dayIdx) => (
                            <div
                                key={day.toString()}
                                className={classNames(
                                dayIdx === 0 && colStartClasses[getDay(day)],
                                'py-1.5'
                                )}
                            >
                                { isSessionDay(day) >= 0 ? (
                                    <Link href={`${bobo.id}/session/${isSessionDay(day) + 1}`}>
                                        <button
                                        type="button"
                                        className="border border-blue-500 hover:bg-sky-500 bg-sky-400 mx-auto flex h-8 w-8 items-center justify-center rounded-full">
                                            {format(day, 'd')}
                                        </button>
                                    </Link>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => {()=> handleDate(day)}}
                                        className={classNames(
                                            isEqual(day, selectedDay) && 'text-white',
                                            !isEqual(day, selectedDay) &&
                                            isToday(day) &&
                                            'text-red-500',
                                            !isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                            isSameMonth(day, firstDayCurrentMonth) &&
                                            'text-gray-900',
                                            !isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                            !isSameMonth(day, firstDayCurrentMonth) &&
                                            'text-gray-400',
                                            isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                                            isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                            'bg-gray-900',
                                            !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                            (isEqual(day, selectedDay) || isToday(day)) &&
                                            'font-semibold',
                                            'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                                        )}>
                                            <time dateTime={format(day, 'yyyy-MM-dd')}>
                                                {format(day, 'd')}
                                            </time>
                                    </button>
                                )}
                            
                            </div>
                        ))}
                    </div>
                </div>
            
                
            </div>
        </div>
        </div>
      );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
  ]

  // https://github.com/samselikoff/2022-05-11-tailwind-ui-interactive-calendar/commit/300b29c1d1e2ddf9b342462efd08ed2fdb156920