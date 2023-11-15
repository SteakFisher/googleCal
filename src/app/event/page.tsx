"use client"

import {ChangeEvent, useState} from "react";
import cloneStructure from "../../../functions/cloneStructure";

type Key = 'start' | 'end' | 'description' | 'summary'

type Events = {
    start: string,
    end: string,
    description: string,
    summary: string
}

export default function Event() {
    const [event, setEvent] = useState({} as Events);
    function onElemChange(e: ChangeEvent, key: Key) {
        // @ts-ignore
        event[key] = e.target.value
        setEvent(cloneStructure(event as Events))
    }

    return (
        <>
            <h1>Add New Calendar Event</h1>
            <form>
                <label>Title</label>
                <input type={'text'} onChange={(e) => {
                    onElemChange(e, 'summary');
                }}/>

                <br />

                <label>Start Time</label>
                <input type={"datetime-local"} onChange={(e) => {
                    onElemChange(e, 'start');
                }}/>

                <label>End Time</label>
                <input type={"datetime-local"} onChange={(e) => {
                    onElemChange(e, 'end');
                }}/>

                <br />

                <label>Description</label>
                <input type={'text'} onChange={(e) => {
                    onElemChange(e, 'description');
                }}/>

                <br />

                <button type={'button'} onClick={(e) => {
                    e.preventDefault()
                    console.log(event)
                }}>Submit</button>
            </form>
        </>
    )
}