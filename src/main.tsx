import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {Toaster} from "@/components/ui/sonner.tsx";
import {ThemeProvider} from "@/providers/theme-provider.tsx";
import {createHashRouter, RouterProvider} from "react-router";
import HomePage from "@/pages/home-page.tsx";
import BlogPost from "@/components/BlogPost.tsx";
import LoginPage from "@/pages/login-page.tsx";
import BlogDashboard from "@/pages/dashboard.tsx";
import SignUpPage from "@/pages/signup-page.tsx";
import BlogPage from "@/pages/blog-page.tsx";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {AuthProvider} from "@/context/auth-context.tsx";
import ForgotPassword from "@/pages/forgot-password.tsx";
import RootLayout from "@/components/layout/root-layout.tsx";

const queryClient = new QueryClient();

const router = createHashRouter([
    {
        path: '/',
        element: <RootLayout/>, // Use layout for routes that should have toolbar
        children: [
            {
                path: '/',
                element: <HomePage/>,
            },
            {
                path: '/blog',
                element: <BlogPage/>,
            },
            {
                path: '/blog/:id',
                element: <BlogPost/>,
            },
            {
                path: '/dashboard',
                element: <BlogDashboard/>,
            }
        ]
    },
    // Auth routes without toolbar
    {
        path: '/login',
        element: <LoginPage/>,
    },
    {
        path: '/signup',
        element: <SignUpPage/>,
    },
    {
        path: '/resetPassword',
        element: <ForgotPassword/>,
    }
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <AuthProvider>
                    <RouterProvider router={router}/>
                    <ReactQueryDevtools initialIsOpen={false}/>
                </AuthProvider>
                <Toaster richColors/>
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>,
)