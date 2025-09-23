import {type FormEvent, useState} from 'react';
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Eye, EyeOff, LogIn} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useAuth} from "@/hooks/useAuth.ts";
import {toast} from "sonner";

export function LoginForm() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();

    // const validateForm = () => {
    //     const newErrors = {username: '', password: ''};
    //     let isValid = true;
    //
    //     if (!identifier.trim()) {
    //         newErrors.username = 'Username is required';
    //         isValid = false;
    //     }
    //
    //     if (!password) {
    //         newErrors.password = 'Password is required';
    //         isValid = false;
    //     } else if (password.length < 6) {
    //         newErrors.password = 'Password must be at least 6 characters';
    //         isValid = false;
    //     }
    //
    //     setErrors(newErrors);
    //     return isValid;
    // };

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors('');

        const success = await login(identifier, password);

        if (success) {
            navigate('/dashboard'); // Redirect to dashboard after login
            toast.success('Logged in successfully!');
        } else {
            toast.error('Invalid username or password.');
            setErrors('Invalid username or password.');
        }

        setIsLoading(false);
    };

    return (
        <form className="flex flex-col gap-5 w-full" onSubmit={handleLogin}>
            {errors && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {errors}
                </div>
            )}
            <div className="flex flex-col gap-2">
                <Label htmlFor="identifier" className="text-sm font-medium text-muted-foreground">
                    Username or Email
                </Label>
                <Input
                    id="identifier"
                    type="text"
                    placeholder="Enter your username or email"
                    value={identifier}
                    onChange={(e) => {
                        setIdentifier(e.target.value);
                    }}
                    disabled={isLoading}
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-sm font-medium text-muted-foreground">
                    Password
                </Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        disabled={isLoading}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                    >
                        {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between text-sm mt-2">
                <Label className="flex items-center gap-2 text-muted-foreground">
                    <Checkbox className="cursor-pointer"/>
                    Remember me
                </Label>
                <Link to="/resetPassword" className="text-blue-600 hover:text-blue-800 hover:underline">
                    Forgot password?
                </Link>
            </div>

            <Button
                type="submit"
                className="w-full py-3 rounded-lg font-medium mt-2 bg-primary hover:bg-primary/80 cursor-pointer transition-colors"
                disabled={isLoading}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 3v18M12 3h18M12 3l-18 18"/>
                        </svg>
                        Signing in...
                    </div>
                ) : (
                    <div className="flex items-center justify-center">
                        <LogIn size={18} className="mr-2"/>
                        Sign In
                    </div>
                )}
            </Button>
        </form>
    );
}