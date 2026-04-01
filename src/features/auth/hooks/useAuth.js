import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser } = context;
    const [loading, setLoading] = useState(false)  // ← local
    const hasFetched = useRef(false)  // ← guard

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });
            setUser(data.user);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            setUser(data.user);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hasFetched.current) return  // ← stop re-running
        hasFetched.current = true

        const getAndSetUser = async () => {
            setLoading(true);
            try {
                const data = await getMe();
                if (data?.user) setUser(data.user);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        getAndSetUser();
    }, []);

    return { user, loading, handleLogin, handleRegister, handleLogout };
};