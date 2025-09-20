// src/lib/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface LoginCredentials {
    identifier: string;
    password: string;
}

interface SignupCredentials {
    email: string;
    password: string;
    username: string;
}

interface User {
    id: string;
    name: string;
    identifier: string;
    email: string;
    avatar?: string;
    username: string;
    password?: string;
}

interface AuthResponse {
    user: User;
    token: string;
}

// Token refresh handling
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
    refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
    refreshSubscribers.forEach(cb => cb(token));
    refreshSubscribers = [];
}

async function refreshAuthToken(): Promise<string> {
    if (isRefreshing) {
        return new Promise((resolve) => {
            subscribeTokenRefresh((token) => {
                resolve(token);
            });
        });
    }

    isRefreshing = true;
    try {
        const response = await authApi.refreshToken();
        localStorage.setItem('authToken', response.token);
        isRefreshing = false;
        onRefreshed(response.token);
        return response.token;
    } catch (error) {
        isRefreshing = false;
        localStorage.removeItem('authToken');
        throw error;
    }
}

async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('authToken');

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    });

    if (!response.ok) {
        // Handle token expiration
        if (response.status === 401 && endpoint !== 'auth/login' && endpoint !== 'auth/signup') {
            try {
                const newToken = await refreshAuthToken();
                // Retry the original request with the new token
                return apiRequest<T>(endpoint, {
                    ...options,
                    headers: {
                        ...options.headers,
                        'Authorization': `Bearer ${newToken}`,
                    },
                });
            } catch (refreshError) {
                // Refresh failed, redirect to login
                localStorage.removeItem('authToken');
                window.location.href = '/login';
                throw refreshError;
            }
        }

        const error = await response.json().catch(() => null);
        throw new Error(error?.message || `API error! status: ${response.status}`);
    }

    return response.json();
}

export const authApi = {
    login: (credentials: LoginCredentials): Promise<AuthResponse> => {
        return apiRequest<AuthResponse>('auth/login/', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    },

    signup: (credentials: SignupCredentials): Promise<AuthResponse> => {
        return apiRequest<AuthResponse>('auth/signup/', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    },

    logout: (): Promise<void> => {
        return apiRequest<void>('auth/logout/', {
            method: 'POST',
        });
    },

    getCurrentUser: (): Promise<User> => {
        return apiRequest<User>('auth/me/');
    },

    refreshToken: (): Promise<{ token: string }> => {
        return apiRequest<{ token: string }>('/auth/refresh/', {
            method: 'POST',
        });
    }
};

export const blogApi = {
    getPosts: (page = 1, limit = 10): Promise<{ posts: string[], total: number }> => {
        return apiRequest<{ posts: string[], total: number }>(`/blog/posts?page=${page}&limit=${limit}`);
    },

    getPost: (id: string): Promise<string> => {
        return apiRequest<string>(`/blog/posts/${id}`);
    },

    createPost: (postData: string): Promise<string> => {
        return apiRequest<string>('/blog/posts', {
            method: 'POST',
            body: JSON.stringify(postData),
        });
    },

    updatePost: (id: string, postData: string): Promise<string> => {
        return apiRequest<string>(`/blog/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(postData),
        });
    },

    deletePost: (id: string): Promise<void> => {
        return apiRequest<void>(`/blog/posts/${id}`, {
            method: 'DELETE',
        });
    },
};