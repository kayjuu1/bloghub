import {LoginForm} from "@/components/login-form.tsx";
import {Card} from "@/components/ui/card.tsx";

function LoginPage() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-blue-50 to-purple-50 p-4">
            <Card className="w-full max-w-md p-8 shadow-lg rounded-xl border-0">
                {/* Logo section */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">KOD</span>
                    </div>
                </div>

                {/* Header */}
                <div className="text-center mb-4">
                    <h1 className="text-3xl font-bold ">Welcome Back👋</h1>
                    <p className="mt-2">Sign in to continue to your account</p>
                </div>

                {/* Login Form */}
                <LoginForm/>

                {/* Footer */}
                <div className="text-center mt-6 pt-6 border-t border-gray-100">
                    <p className="text-sm">
                        Don't have an account?{" "}
                        <a href="#" className="text-blue-600 hover:underline font-medium">
                            Sign up
                        </a>
                    </p>
                </div>
            </Card>
        </div>
    );
}

export default LoginPage;