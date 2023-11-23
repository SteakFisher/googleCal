"use client"

import {ChangeEvent, useState} from "react";
import cloneStructure from "../../../functions/cloneStructure";
import { Database } from '../../../types/supabase'
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";
import {DateTime} from "luxon";

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
    const router = useRouter()

    function convert(time: string) {
        let temp = new Date(time);
        return temp.toISOString()
    }

    function onElemChange(e: ChangeEvent<HTMLInputElement>, key: Key) {
        event[key] = e.target.value
        setEvent(cloneStructure(event as Events))
    }

    return (
        <>
            <h1>Add New Calendar Event</h1>
            <form>

                <label>
                    Timezone: {DateTime.local().zoneName}
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
                                start_time: DateTime.fromJSDate(new Date(event.start)).toSQL(),
                                end_time: DateTime.fromJSDate(new Date(event.end)).toSQL()
                            }])
                            .select()

                        if (data && data?.length > 0) {
                            console.log(data[0]['id'])
                            router.push(`/subscribe/${String(data[0].id)}`)
                        }
                    }
                }}>Submit</button>
            </form>
        </>
    )
}