"use client"

import {ChangeEvent, useState} from "react";
import cloneStructure from "../../../functions/cloneStructure";
import { Database } from '../../../types/supabase'
import {createClient} from "@supabase/supabase-js";

type Key = 'start' | 'end' | 'description' | 'summary'

type Events = {
    start: string,
    end: string,
    description: string,
    summary: string
}

export default function Event() {
    const supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    const [event, setEvent] = useState({} as Events);
    const [error, setError] = useState("");
    function onElemChange(e: ChangeEvent, key: Key) {
        // @ts-ignore
        event[key] = e.target.value
        setEvent(cloneStructure(event as Events))
    }

    return (
        <>
            <h1>Add New Calendar Event</h1>
            <form>

                <label>
                    TimeZone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
                </label>
                <br />

                <label>Title</label>
                <input className={"bg-slate-800"} type={'text'} onChange={(e) => {
                    onElemChange(e, 'summary');
                }}/>

                <br />

                <label>Start Time</label>
                <input className={"bg-slate-800"} type={"datetime-local"} onChange={(e) => {
                    onElemChange(e, 'start');
                }}/>

                <label>End Time</label>
                <input className={"bg-slate-800"} type={"datetime-local"} onChange={(e) => {
                    onElemChange(e, 'end');
                }}/>

                <br />

                <label>Description</label>
                <input className={"bg-slate-800"} type={'text'} onChange={(e) => {
                    onElemChange(e, 'description');
                }}/>

                {

                    error ? (
                        <>
                            <br />
                                <label>
                                    {error}
                                </label>
                        </>
                    ): null
                }

                <br />

                <button type={'button'} onClick={ async (e) => {
                    e.preventDefault()
                    if (!event.summary) {
                        setError("Event title can't be blank")
                    }
                    else if (!event.start || !event.end) {
                        setError("Event should have a start and end time")
                    }
                    else if (event.start >= event.end) {
                        setError("Event end time should be after the event's start time")
                    }
                    else {
                        
                        setError("");
                    }
                    console.log(event)
                }}>Submit</button>
            </form>
        </>
    )
}