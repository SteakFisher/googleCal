
import {createClientComponentClient, createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "../../../../types/supabase";
import {cookies} from "next/headers";
import {start} from "repl";
import SubscribeEvent from "@/app/subscribe/[id]/SubscribeEvent";


export default async function Subscription({params: {id: id}}: { params: { id: number } }) {
    const cookieStore = cookies()
    const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })

    let {data } = await supabase
        .from('events')
        .select()
        .eq('id', id);
    console.log(data)

    if(data) {
        let startTime = new Date(data[0].start_time as string);
        startTime =   new Date( startTime.getTime() + ( startTime.getTimezoneOffset() * 60000 ) );

        let endTime = new Date(data[0].end_time as string);
        endTime =   new Date( endTime.getTime() + ( startTime.getTimezoneOffset() * 60000 ) );

        const { data: {session}} = await supabase.auth.getSession();

        return (
            <>
                <h3>{data[0].summary}</h3>
                {data[0].description ? (<h3>{data[0].description}</h3>) : null}
                <h3>{startTime.toLocaleDateString()} {startTime.toLocaleTimeString()}</h3>
                <h3>{endTime.toLocaleDateString()} {endTime.toLocaleTimeString()}</h3>

                { session ? <SubscribeEvent data ={data[0]} signedIn={true} id={String(id)}/> : <SubscribeEvent signedIn={false} id={String(id)}/>}
            </>

        )
    }
    else {
        return (
            <h1> No Such Event! </h1>
        )
    }
}