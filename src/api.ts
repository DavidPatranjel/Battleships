const baseUrl = 'https://malamute-enabled-yak.ngrok-free.app';

const baseHeaders = {
    "Content-Type": 'application/json',
    "Accept": 'application/json'
}

export const login = async (email: string, password: string): Promise<string> => {
    const result = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            email, password
        })
    })

    const data = await result.json()
    return data.accessToken
};

export const register = async (email: string, password: string) => {
    const result = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            email, password
        })
    })

    const data = await result.json()

    return data.accessToken
};

export const getGames = async () => {
    const result = await fetch(`${baseUrl}/game`, {
        method: 'GET',
        headers: {
            ...baseHeaders
        }
    })

    const data = await result.json()

    return data.games
};


export const createGame = async (email: string, password: string) => {
    const result = await fetch(`${baseUrl}/game`, {
        method: 'POST',
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            email, password
        })
    })

    const data = await result.json()

    return data.accessToken
};

export const getGame = async (gameId:string) => {
    const result = await fetch(`${baseUrl}/game/${gameId}`, {
        method: 'GET',
        headers: {
            ...baseHeaders
        }
    })

    const data = await result.json()

    return data.games
};