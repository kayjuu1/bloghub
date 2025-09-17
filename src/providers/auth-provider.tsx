import {AuthContext} from "@/context/auth-context";
import {type ReactNode, useState} from "react";
import type {User} from "@/types/types.ts";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (email: string, password: string): Promise<boolean> => {
        // Simulate API call
        if (email === 'admin@bloghub.com' && password === 'password') {
            setUser({
                id: '1',
                name: 'John Doe',
                email: email,
                avatar: 'https://github.com/shadcn.png'
            });
            return true;
        }
        return false;
    };

    const signup = async (email: string, password: string, username: string): Promise<boolean> => {
        // Simulate API call for signup
        // In a real app, this would make a request to your backend
        try {
            // Simulate successful signup
            setUser({
                id: Date.now().toString(), // Generate a temporary ID
                name: username,
                email: email,
                username: username,
                password: password,
                avatar: 'https://github.com/shadcn.png' // Default avatar
            });
            return true;
        } catch (error) {
            console.error('Signup failed:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            signup,
            login,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};
