// src/contexts/auth-context.tsx
import {createContext} from 'react';
import type {User} from "@/types/types.ts";



interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (email: string, password: string, username: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


