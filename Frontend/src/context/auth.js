import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });
    // default axios
    // axios.defaults.headers.common['Authorization'] = auth?.token;
    useEffect(() => {
        const data = localStorage.getItem('auth');
        if (data) {
            const parsedData = JSON.parse(data);
            setAuth(prev => ({
                ...prev,
                user: parsedData.user,
                token: parsedData.token
            }))
        }
    }, []);
    // console.log("User check", auth);
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom Hook
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };