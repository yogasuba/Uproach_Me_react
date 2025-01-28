'use client'

import React, { useEffect, useRef, useState } from 'react'

export default function Calendar() {
    const container = useRef(null)
    const containerNav = useRef(null)
    const containerOffset = useRef(null)
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        // Scroll to the current time on mount
        const currentMinute = currentTime.getHours() * 60 + currentTime.getMinutes()
        container.current.scrollTop =
            ((container.current.scrollHeight - containerNav.current.offsetHeight - containerOffset.current.offsetHeight) *
                currentMinute) /
            1440

        // Update the current time every minute
        const interval = setInterval(() => {
            setCurrentTime(new Date())
        }, 60000)

        return () => clearInterval(interval)
    }, [])

    const hours = Array.from({ length: 24 }, (_, i) => i)
    const days = [
        { short: 'M', long: 'Mon', date: 10 },
        { short: 'T', long: 'Tue', date: 11 },
        { short: 'W', long: 'Wed', date: 12, highlight: true },
        { short: 'T', long: 'Thu', date: 13 },
        { short: 'F', long: 'Fri', date: 14 },
        { short: 'S', long: 'Sat', date: 15 },
        { short: 'S', long: 'Sun', date: 16 }
    ]

    // Calculate the needle position
    const totalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes()
    const needlePosition = `calc(${(totalMinutes / 1440) * 100}% - 7px)`

    return (
        <div className="flex h-screen flex-col overflow-scroll overflow-x-hidden overflow-y-hidden">
            <header className="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
                <h1 className="text-base font-semibold text-gray-900">
                    <time dateTime="2022-01">January 2022</time>
                </h1>
            </header>
            <div ref={container} className="isolate flex flex-auto flex-col overflow-auto bg-white">
                <div style={{ width: '165%' }} className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
                    <div
                        ref={containerNav}
                        className="sticky top-0 z-30 flex-none bg-white ring-1 shadow-sm ring-black/5 sm:pr-8"
                    >
                        <div className="-mr-px grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm/6 text-gray-500 sm:grid">
                            <div className="col-end-1 w-14" />
                            {days.map(({ long, date, highlight }) => (
                                <div
                                    key={date}
                                    className="flex items-center justify-center py-3"
                                >
                                    <span className="flex items-baseline">
                                        {long}{' '}
                                        <span
                                            className={`ml-1.5 flex size-8 items-center justify-center font-semibold ${highlight
                                                ? 'rounded-full bg-indigo-600 text-white'
                                                : 'text-gray-900'
                                                }`}
                                        >
                                            {date}
                                        </span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative flex flex-auto">
                        {/* SVG Needle */}
                        <div
                            className="absolute left-[50px] z-20 w-[138px] h-[14px]"
                            style={{ top: needlePosition }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="14" viewBox="0 0 138 14" fill="none">                             
                                <rect width="14" height="14" rx="7" fill="#FF4B55" />                               
                                <rect x="4" y="6" width="134" height="2" rx="1" fill="#FF4B55" />
                                <line x1="14" y1="7" x2="100%" y2="7"
                                    stroke="#FF4B55"
                                    stroke-width="1"
                                    opacity="0.5" />
                            </svg>
                        </div>
                        <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-200" />
                        <div className="grid flex-auto grid-cols-1 grid-rows-1">
                            {/* Hours */}
                            <div
                                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-200"
                                style={{ gridTemplateRows: 'repeat(24, minmax(6rem, 1fr))' }}
                            >
                                <div ref={containerOffset} className="row-end-1 h-7"></div>
                                {hours.map((hour) => (
                                    <div key={hour}>
                                        <div
                                            className={`sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 font-medium text-gray-600`}
                                        >
                                            {hour === 0
                                                ? '12AM'
                                                : hour < 12
                                                    ? `${hour}AM`
                                                    : hour === 12
                                                        ? '12PM'
                                                        : `${hour - 12}PM`}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Events */}
                            <ol
                                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                                style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
                            >
                                {/* Example Event */}
                                <li className="relative mt-px flex sm:col-start-3" style={{ gridRow: '74 / span 12' }}>
                                    <a
                                        href="#"
                                        className="group absolute inset-1 flex flex-row overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs/5 hover:bg-blue-100"
                                    >
                                        <div className="w-1 bg-blue-700"></div>
                                        <div className='flex flex-col ml-2'>
                                            <p className="order-1 font-semibold text-blue-700">Breakfast</p>
                                            <p className="text-blue-500 group-hover:text-blue-700">
                                                <time dateTime="2022-01-12T06:00">6:00 AM</time>
                                            </p>
                                        </div>
                                    </a>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
