type params = { [key: string]: string };

type fetchInit = {
    headers: params | undefined,
    body: params | undefined
}

export default async function googleClientFetch(url: string, init?: RequestInit) {
    if (init) {
        if (!init['headers']) {
            init['headers'] = {};
        }
        init['headers'] = {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }
    else {
        init = {
            "headers" : {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }
    }
    return await ((await fetch(url, init)).json())
}