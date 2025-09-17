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
import {AuthProvider} from "@/providers/auth-provider.tsx";
import BlogPage from "@/pages/blog-page.tsx";


const router = createHashRouter([
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
        path: '/login',
        element: <LoginPage/>,
    },
    {
        path: '/signup',
        element: <SignUpPage/>,
    },
    {
        path: '/dashboard',
        element: <BlogDashboard/>,
    }
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AuthProvider>
                <RouterProvider router={router}/>
            </AuthProvider>
            <Toaster/>
        </ThemeProvider>
    </StrictMode>,
)
