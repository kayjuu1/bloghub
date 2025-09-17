// src/contexts/auth-context.tsx
import React, {createContext, type ReactNode, useState} from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    username?: string;
    password?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (email: string, password: string, username: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

