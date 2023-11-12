"use client"

import {useEffect} from "react";

export default function Event() {
    useEffect( () => {
        const getCalendars = async () => {
            console.log(await ((await fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })).json()));
        }
        getCalendars();
    }, []);

    return (
        <>
            <h1>Add New Calendar Event</h1>
            <h2>Calendars</h2>
        </>
    )
}