'use client'
import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUserData(JSON.parse(storedUser))
        }
        setLoading(false);
    }, [])

    const login = (user) => {
        setUserData(user);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const logout = () => {
        setUserData(null);
        localStorage.removeItem("user");
    };


    return (
        <AuthContext.Provider value={{ userData, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );

}

export default function useAuths() {
    return useContext(AuthContext);
}