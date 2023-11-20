"use client"

import {ChangeEvent, useState} from "react";
import cloneStructure from "../../../functions/cloneStructure";
import { Database } from '../../../types/supabase'
import {createClient} from "@supabase/supabase-js";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";

type Key = 'start' | 'end' | 'description' | 'summary'

type Events = {
    start: string,
    end: string,
    description: string,
    summary: string
}

const supabase = createClientComponentClient<Database>()

export default function Event() {
    const [event, setEvent] = useState({} as Events);
    const [error, setError] = useState("");

    function convert(time: string) {
        let temp = new Date(time);
        return temp.toISOString()
    }

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
                    TimeZone: {Intl.DateTimeFormat('en-US').resolvedOptions().timeZone}
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
                    setError("");

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
                        let {data , error } = await supabase
                            .from('events')
                            .insert([{
                                summary: event.summary,
                                description: event.description,
                                start_time: convert(event.start),
                                end_time: convert(event.end)
                            }])
                            .select()

                        if (data && data?.length > 0) {
                            data[0]['id']
                        }
                    }
                }}>Submit</button>
            </form>
        </>
    )
}