import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";

type params = { [key: string]: string };

type fetchInit = {
    headers: params | undefined,
    body: params | undefined
}

export default async function googleClientFetch(url: string, init?: RequestInit) {
    const supabase = createClientComponentClient();

    let { data: { session }} = await supabase.auth.getSession();

    console.log(session)

    if (session) {
        if (init) {
            if (!init['headers']) {
                init['headers'] = {};
            }
            init['headers'] = {
                "Authorization": `Bearer ${session.access_token}`
            }
        }
        else {
            init = {
                "headers" : {
                    "Authorization": `Bearer ${session.access_token}`
                }
            }
        }
        return await ((await fetch(url, init)).json())
    }
}