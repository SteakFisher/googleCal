"use client"

import {useEffect} from "react";
import googleClientFetch from "../../../functions/googleClientFetch";

export default function Event() {
    useEffect( () => {
        const getCalendars = async () => {
            console.log(await googleClientFetch("https://www.googleapis.com/calendar/v3/users/me/calendarList"));
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