const baseUrl = 'http://localhost:3030/users';


async function login(email, password) {
    let res = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    let jsonResult = await res.json();

    if (res.ok) {
        return jsonResult;
    } else {
        throw jsonResult.message;
    }
};

async function register(username, email, password,) {
    return fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, })
    })
        .then(res => res.json());
};

async function logout(token) {
    return fetch(`${baseUrl}/logout`, {
        headers: {
            'X-Authorization': token,
        }
    })
};

export {
    login,
    register,
    logout
}