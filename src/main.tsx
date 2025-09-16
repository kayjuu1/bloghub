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
import {AuthProvider} from "@/context/auth-context.tsx";
import BlogSection from "@/components/sections/blog-section.tsx";


const router = createHashRouter([
    {
        path: '/',
        element: <HomePage/>,
    },
    {
        path: '/blog',
        element: <BlogSection/>,
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
