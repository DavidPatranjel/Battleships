const baseUrl = process.env.EXPO_PUBLIC_API_URL
const baseHeaders = {
    "Content-Type": 'application/json',
    "Accept": 'application/json'
}

export const login = async (email: string, password: string): Promise<string> => {
    console.log(`${baseUrl}/auth/login`)
    console.log(email);
    console.log(password);
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
    console.log(result);
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


export const getUserId = async (token:string) => {
    const result = await fetch(`${baseUrl}/user/details/me`, {
        method: 'GET',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await result.json()
    return data.user.id;
};

export const getGames = async (token:string) => {
    const result = await fetch(`${baseUrl}/game`, {
        method: 'GET',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await result.json()
    return data.games;
}


export const createGame = async (token:string) => {
    const result = await fetch(`${baseUrl}/game`, {
        method: 'POST',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await result.json()

    return data
};

export const joinGame = async (token:string, gameid:string) => {
    const result = await fetch(`${baseUrl}/game/join/${gameid}`, {
        method: 'POST',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await result.json()

    return data
};

export const getGame = async (token:string, gameId:string) => {
    const result = await fetch(`${baseUrl}/game/${gameId}`, {
        method: 'GET',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await result.json()
    return data
};


export const getUserEmail = async (token:string) => {
    const result = await fetch(`${baseUrl}/user/details/me`, {
        method: 'GET',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await result.json()
   
    return data.user.email;
};

export const getNumbergames = async (token:string) => {
    const result = await fetch(`${baseUrl}/user/details/me`, {
        method: 'GET',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await result.json()
    return data.currentlyGamesPlaying;
};

export const getNumberGamesLost = async (token:string) => {
    const result = await fetch(`${baseUrl}/user/details/me`, {
        method: 'GET',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await result.json()
    return data.gamesLost;
};

export const getNumberGamesWon = async (token:string) => {
    const result = await fetch(`${baseUrl}/user/details/me`, {
        method: 'GET',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await result.json()
    return data.gamesWon;
};

export const getNumberGamesPlayed = async (token:string) => {
    const result = await fetch(`${baseUrl}/user/details/me`, {
        method: 'GET',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await result.json()
    return data.gamesPlayed;
};

