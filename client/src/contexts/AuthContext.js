import { createContext, useContext } from 'react'

import useLocalStorage from '../hooks/useLocalStorage'

const defaultUserData = {
    _id: '',
    username: '',
    email: '',
    accessToken: '',
}

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('user', defaultUserData)

    const login = (userData) => {
        setUser(userData)
    }

    const logout = () => {
        setUser(defaultUserData)
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated: !!user.accessToken
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuthContext = () => {
    const authState = useContext(AuthContext);

    return authState;
}