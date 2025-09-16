import {Link} from "react-router-dom";
import {Copyright} from "lucide-react";

function Footer() {
    return (
        <div className="text-white p-4 h-16 w-full border-b bg-black backdrop-blur supports-[backdrop-filter]:bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
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
                    <div className="flex items-center space-x-2 font-semibold">
                        <Copyright/>
                        <h2>2025 BlogHub. All rights reserved.</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;