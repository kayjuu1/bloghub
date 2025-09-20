// src/hooks/useAuth.ts
import {useContext} from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {authApi} from "@/lib/api";
import {AuthContext} from "@/context/auth-context.tsx";

// Query keys
export const authKeys = {
    all: ['auth'] as const,
    user: () => [...authKeys.all, 'user'] as const,
};

// Hook for getting the current user
export function useUser() {
    const {data: user, isLoading, error} = useQuery({
        queryKey: authKeys.user(),
        queryFn: async () => {
            const token = localStorage.getItem('authToken');
            if (!token) throw new Error('No token found');
            return authApi.getCurrentUser();
        },
        retry: (failureCount, error) => {
            if (error.message === 'No token found') return false;
            return failureCount < 2;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return {user, isLoading, error};
}

// Hook for login mutation
export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({identifier, password}: { identifier: string; password: string }) =>
            authApi.login({identifier, password}),
        onSuccess: (data) => {
            localStorage.setItem('authToken', data.token);
            queryClient.setQueryData(authKeys.user(), data.user);
        },
    });
}

// Hook for signup mutation
export function useSignup() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({email, password, username}: {
            email: string;
            password: string;
            username: string;
        }) => authApi.signup({email, password, username}),
        onSuccess: (data) => {
            localStorage.setItem('authToken', data.token);
            queryClient.setQueryData(authKeys.user(), data.user);
        },
    });
}

// Hook for logout mutation
export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
            localStorage.removeItem('authToken');
            queryClient.setQueryData(authKeys.user(), null);
            queryClient.clear();
        },
    });
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};