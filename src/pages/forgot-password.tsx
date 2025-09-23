import {Link} from "react-router-dom";
import {ArrowLeft} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {toast} from "sonner";
import {useNavigate} from "react-router";
import {useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

function ForgotPassword() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handlePasswordReset = (e: React.FormEvent) => {
        e.preventDefault();
        const email = (e.target as any).email.value;
        // Check if email is valid
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }
        // Check if email exists in the database
        if (email === email) {
            toast.success(" Password reset link sent to your email")
            navigate("/")
        }
        setLoading(false);
    }


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="loader">Loading...</div>
            </div>
        );
    }
    return (
        <>
            <div className="container flex min-h-screen flex-col items-center justify-center px-4">
                <div className="mx-auto w-full max-w-md space-y-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Forgot Password</h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email to reset your password
                        </p>
                    </div>
                    <form className="flex flex-col gap-5 w-full" onSubmit={handlePasswordReset}>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full rounded-lg"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full cursor-pointer"
                            disabled={false}
                        >
                            <div
                                className="flex items-center justify-center py-3 ">
                                Send Reset Link
                            </div>
                        </Button>
                    </form>
                    <span className="text-sm text-muted-foreground text-center flex items-center justify-center">
                        Remembered your password?&nbsp;
                        <Link to="/login" className="text-blue-600 hover:text-blue-800 hover:underline">
                            Login
                        </Link>
                    </span>
                    <div className="hover:underline hover:text-blue-800  text-center">
                        <Link to="/login" className="text-sm text-muted-foreground flex items-center justify-center">
                            <ArrowLeft size={15} className="mr-2"/> Back
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;