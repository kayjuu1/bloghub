import {type FormEvent, useState} from 'react';
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Eye, EyeOff, LogIn} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useAuth} from "@/context/auth-context.tsx";
import {toast} from "sonner";

export function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({username: '', password: ''});
    const navigate = useNavigate();
    const {login} = useAuth();

    const validateForm = () => {
        const newErrors = {username: '', password: ''};
        let isValid = true;

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

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        if (!validateForm()) return;

        const success = await login(username, password);

        if (success) {
            navigate('/dashboard'); // Redirect to dashboard after login
        } else {
            toast.error('Invalid username or password.');
        }

        setIsLoading(false);
    };

    return (
        <form className="flex flex-col gap-5 w-full" onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">
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
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
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
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
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

            <div className="flex items-center justify-between text-sm mt-2">
                <Label className="flex items-center gap-2 text-gray-600">
                    <Checkbox/>
                    Remember me
                </Label>
                <Link to="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                    Forgot password?
                </Link>
            </div>

            <Button
                type="submit"
                className="w-full py-3 rounded-lg font-medium mt-2 bg-primary hover:bg-primary/80 text-white transition-colors"
                disabled={isLoading}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
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