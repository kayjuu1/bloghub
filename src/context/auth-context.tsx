// Update your auth-context.tsx to include the implementation
import {createContext, type ReactNode, useEffect} from 'react';
import {authKeys, useLogin, useLogout, useSignup, useUser} from '@/hooks/useAuth';
import {useQueryClient} from '@tanstack/react-query';
import type {User} from "@/types/types";

export interface AuthContextType {
    user: User | null;
    login: (identifier: string, password: string) => Promise<boolean>;
    signup: (email: string, password: string, username: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const { user, isLoading: userLoading } = useUser();
    const loginMutation = useLogin();
    const signupMutation = useSignup();
    const logoutMutation = useLogout();
    const queryClient = useQueryClient();

    const login = async (identifier: string, password: string): Promise<boolean> => {
        try {
            await loginMutation.mutateAsync({ identifier, password });
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const signup = async (email: string, password: string, username: string): Promise<boolean> => {
        try {
            await signupMutation.mutateAsync({ email, password, username });
            return true;
        } catch (error) {
            console.error('Signup failed:', error);
            return false;
        }
    };

    const logout = () => {
        logoutMutation.mutate();
    };

    // Check for existing token on mount
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token && !user) {
            // Token exists but user data isn't loaded, refetch user
            queryClient.refetchQueries({ queryKey: authKeys.user() });
        }
    }, [user, queryClient]);

    const value: AuthContextType = {
        user: user || null, // Convert undefined to null
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isLoading: userLoading || loginMutation.isPending || signupMutation.isPending,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};