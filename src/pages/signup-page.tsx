import {Card} from "@/components/ui/card";
import {SignUpForm} from "@/components/signup-form";
import {Link} from "react-router-dom";

function SignUpPage() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-background/90 p-4">
            <Card className="w-full max-w-md p-8 shadow-lg rounded-xl border-2 border-gray-200">
                {/* Logo section */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">KOD</span>
                    </div>
                </div>

                {/* Header */}
                <div className="text-center mb-4">
                    <h1 className="text-3xl font-bold">Let's get you going 🚀</h1>
                    <p className="mt-2">Sign up and get started</p>
                </div>

                {/* Signup Form */}
                <SignUpForm/>

                {/* Footer */}
                <div className="text-center mt-6 pt-6 border-t border-gray-100">
                    <p className="text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}

export default SignUpPage;