
import {createClientComponentClient, createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "../../../../types/supabase";
import {cookies} from "next/headers";
import {start} from "repl";
import SubscribeEvent from "@/app/subscribe/[id]/SubscribeEvent";
import {DateTime} from "luxon";


export default async function Subscription({params: {id: id}}: { params: { id: number } }) {
    const cookieStore = cookies()
    const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })

    let {data } = await supabase
        .from('events')
        .select()
        .eq('id', id);

    if(data) {
        const { data: {session}} = await supabase.auth.getSession();

        return (
            <>
                <h3>{data[0].summary}</h3>
                {data[0].description ? (<h3>{data[0].description}</h3>) : null}
                <h3>{DateTime.fromISO(data[0].start_time as string).toLocaleString(DateTime.DATETIME_SHORT)}</h3>
                <h3>{DateTime.fromISO(data[0].end_time as string).toLocaleString(DateTime.DATETIME_SHORT)}</h3>

                { session ? <SubscribeEvent data ={data[0]} signedIn={true} id={String(id)} primaryCal={cookies().get('primaryCal')?.value}/> : <SubscribeEvent signedIn={false} id={String(id)}/>}
            </>

        )
    }
    else {
        return (
            <h1> No Such Event! </h1>
        )
    }
}