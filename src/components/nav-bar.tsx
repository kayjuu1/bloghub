import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {NavUser} from "@/components/nav-user";
import {Menu, X} from "lucide-react";
import {ThemeToggle} from "@/components/theme-toggle.tsx";
import {useAuthContext} from "@/context/use-auth-context.tsx";
import {useAuth} from "@/hooks/useAuth.ts";


function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const {isAuthenticated} = useAuthContext();
    const {user} = useAuth()


    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <>
            <header
                className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">B</span>
                            </div>
                            <span className="font-bold text-xl hidden sm:inline-block">
                            BlogHub
                        </span>
                        </Link>
                    </div>

                    {/* Navigation Links - Center */}
                    <nav className="hidden md:flex items-center justify-center flex-1 gap-6 px-4">
                        <Link
                            to="/"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            Home
                        </Link>
                        <Link
                            to="/blog"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            Blog
                        </Link>
                        {isAuthenticated && (
                            <Link
                                to="/dashboard"
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                Dashboard
                            </Link>
                        )}
                        <Link
                            to="/about"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            About
                        </Link>
                        <Link
                            to="/contact"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* Right Side - Auth Buttons or User Menu */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {isAuthenticated ? (
                            <>
                                <div className="hidden md:flex">
                                    <NavUser/>
                                </div>
                                <div className="hidden sm:flex gap-2">
                                    <ThemeToggle/>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button variant="outline" asChild className="hidden sm:flex">
                                    <Link to="/login">Sign in</Link>
                                </Button>
                                <Button asChild className="hidden sm:flex">
                                    <Link to="/signup">Sign up</Link>
                                </Button>
                                <div className="hidden sm:flex gap-2">
                                    <ThemeToggle/>
                                </div>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t">
                        <div className="px-4 py-4 space-y-4">
                            <Link
                                to="/"
                                className="block py-2 text-sm font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                to="/blog"
                                className="block py-2 text-sm font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Blog
                            </Link>
                            {isAuthenticated && (
                                <Link
                                    to="/dashboard"
                                    className="block py-2 text-sm font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            )}
                            <Link
                                to="/about"
                                className="block py-2 text-sm font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                to="/contact"
                                className="block py-2 text-sm font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </Link>

                            {isAuthenticated && user ? (
                                <div className="pt-4 space-y-3 border-t">
                                    <div className="flex items-center justify-between py-2">
                                        <div className="flex items-center gap-3">
                                            {user.avatar && (
                                                <img
                                                    src={user.avatar}
                                                    alt={user.name || user.username || 'User'}
                                                    className="h-8 w-8 rounded-full"
                                                />
                                            )}
                                            <div>
                                                <p className="text-sm font-medium">{user.name || user.username || 'User'}</p>
                                                <p className="text-xs text-muted-foreground">{user.email || 'No email'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        Logout
                                    </Button>
                                    <ThemeToggle/>
                                </div>
                            ) : (
                                <div className="pt-4 space-y-3 border-t">
                                    <Button asChild className="w-full">
                                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                            Sign in
                                        </Link>
                                    </Button>
                                    <Button variant="outline" asChild className="w-full">
                                        <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                                            Sign up
                                        </Link>
                                    </Button>
                                    <ThemeToggle/>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </header>
        </>
    )
}

export default NavBar