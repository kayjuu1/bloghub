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
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({username: '', password: '', email: ''});
    const navigate = useNavigate();
    const {signup} = useAuth();

    const validateForm = () => {
        const newErrors = {username: '', password: '', email: ''};
        let isValid = true;

        if (!email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        }

        if (!username.trim()) {
            newErrors.username = 'Username is required';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);

        const success = await signup(username, password, email);

        if (success) {
            navigate('/login'); // Redirect to dashboard after login
        } else {
            toast.error('');
        }

        setIsLoading(false);
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
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({...errors, email: ''});
                    }}
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
                {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
            </div>

            {/*<div className="flex items-center justify-between text-sm mt-2">*/}
            {/*    <Label className="flex items-center gap-2 text-muted-foreground">*/}
            {/*        <Checkbox className="cursor-pointer"/>*/}
            {/*        Remember me*/}
            {/*    </Label>*/}
            {/*    <Link to="#" className="text-blue-600 hover:text-blue-800 hover:underline">*/}
            {/*        Forgot password?*/}
            {/*    </Link>*/}
            {/*</div>*/}

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
                        Signing Up...
                    </div>
                ) : (
                    <div className="flex items-center justify-center">
                        {/*< size={18} className="mr-2"/>*/}
                        Sign Up
                    </div>
                )}
            </Button>
        </form>
    );
}