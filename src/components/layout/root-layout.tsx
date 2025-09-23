import { Outlet } from 'react-router-dom';
import Toolbar from "@/components/kokonutui/toolbar.tsx";

export default function RootLayout() {
    return (
        <div className="min-h-screen">
            <Outlet /> {/* This renders the current page content */}
            <Toolbar className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center border-none bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-auto max-w-[90vw] sm:max-w-md px-4 py-2 rounded-lg shadow-lg z-50" />
        </div>
    );
}