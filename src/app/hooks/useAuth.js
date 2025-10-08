"use client";
import { useState, useEffect } from 'react';

export default function useAuth() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const data = localStorage.getItem('user');
        if (data) {
            setUserData(JSON.parse(data));
        } else {
            setUserData(null);
        }
        setLoading(false); 
    }, []);

    return { userData, loading }; 
}
