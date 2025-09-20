import {type FormEvent, useState} from 'react';
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Eye, EyeOff} from "lucide-react";
import {useNavigate} from "react-router";
import {useAuth} from "@/hooks/useAuth.ts";
import {toast} from "sonner";

export function SignUpForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        email: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();
    const {signup} = useAuth();

    // Validation functions
    const validateEmail = (email: string): string => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return 'Email is required';
        if (!emailRegex.test(email)) return 'Please enter a valid email address';
        return '';
    };

    const validateUsername = (username: string): string => {
        if (!username) return 'Username is required';
        if (username.length < 3) return 'Username must be at least 3 characters long';
        if (username.length > 20) return 'Username must be less than 20 characters';
        return '';
    };

    const validatePassword = (password: string): string => {
        if (!password) return 'Password is required';
        if (password.length < 6) return 'Password must be at least 6 characters long';
        return '';
    };

    const validateConfirmPassword = (confirmPassword: string, password: string): string => {
        if (!confirmPassword) return 'Please confirm your password';
        if (confirmPassword !== password) return 'Passwords do not match';
        return '';
    };

    const validateForm = (): boolean => {
        const newErrors = {
            username: validateUsername(username),
            email: validateEmail(email),
            password: validatePassword(password),
            confirmPassword: validateConfirmPassword(confirmPassword, password)
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setIsLoading(true);

        try {
            const success = await signup(email, password, username);

            if (success) {
                toast.success('Account created successfully!');
                navigate('/login'); // Redirect to login after successful signup
            } else {
                toast.error('Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            toast.error('An error occurred during signup. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="flex flex-col gap-5 w-full" onSubmit={handleSignUp}>
            <div className="flex flex-col gap-2">
                <Label htmlFor="username" className="text-sm font-medium text-muted-foreground">
                    Username
                </Label>
                <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        if (errors.username) setErrors({...errors, username: ''});
                    }}
                    onBlur={() => setErrors({...errors, username: validateUsername(username)})}
                    disabled={isLoading}
                />
                {errors.username && (
                    <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                    Email
                </Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({...errors, email: ''});
                    }}
                    onBlur={() => setErrors({...errors, email: validateEmail(email)})}
                    disabled={isLoading}
                />
                {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
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
                            if (errors.password) setErrors({...errors, password: ''});
                            // Also validate confirm password when password changes
                            if (confirmPassword) {
                                setErrors({
                                    ...errors,
                                    password: '',
                                    confirmPassword: validateConfirmPassword(confirmPassword, e.target.value)
                                });
                            }
                        }}
                        onBlur={() => setErrors({...errors, password: validatePassword(password)})}
                        disabled={isLoading}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                    >
                        {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                    Password must be at least 6 characters long
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-muted-foreground">
                    Confirm Password
                </Label>
                <div className="relative">
                    <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (errors.confirmPassword) setErrors({...errors, confirmPassword: ''});
                        }}
                        onBlur={() => setErrors({
                            ...errors,
                            confirmPassword: validateConfirmPassword(confirmPassword, password)
                        })}
                        disabled={isLoading}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isLoading}
                    >
                        {showConfirmPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full py-3 rounded-lg font-medium mt-2 bg-primary hover:bg-primary/80 cursor-pointer transition-colors"
                disabled={isLoading}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <div
                            className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"/>
                        Signing Up...
                    </div>
                ) : (
                    <div className="flex items-center justify-center">
                        Sign Up
                    </div>
                )}
            </Button>
        </form>
    );
}