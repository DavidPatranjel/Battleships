const baseUrl = process.env.EXPO_PUBLIC_API_URL
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

export const sendMapConfiguration = async (gameId: string, token: string, ships: any[]) => {
    const result = await fetch(`${baseUrl}/game/${gameId}`, {
        method: 'PATCH',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            ships
        })
    });

    const data = await result.json();
    console.log(data);
    return data;
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

export const strikeInGame = async (token:string, gameid:string, x: string, y: number) => {
    console.log(gameid, x, y);
    const result = await fetch(`${baseUrl}/game/strike/${gameid}`, {
        method: 'POST',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            x,
            y
        })
    })

    const data = await result.json()
    return data
};