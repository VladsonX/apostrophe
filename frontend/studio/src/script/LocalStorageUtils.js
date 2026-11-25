const jwtTokenLocalStorageKey = "JWT_KEY";

export const getCurrentJwtToken = () => {
    return localStorage.getItem(jwtTokenLocalStorageKey);
}

export const putCurrentJwtToken = (token) => {
    localStorage.setItem(jwtTokenLocalStorageKey, token)
}

export const resetCurrentJwtToken = () => {
    localStorage.removeItem(jwtTokenLocalStorageKey);
}