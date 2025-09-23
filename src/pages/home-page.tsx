import NavBar from "@/components/nav-bar.tsx";
import HeroSection from "@/components/sections/hero-section.tsx";
import BlogSection from "@/components/sections/blog-section.tsx";
import Footer from "@/components/sections/footer.tsx";
import Toolbar from "@/components/kokonutui/toolbar.tsx";

function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            <NavBar/>
            <HeroSection/>
            <BlogSection/>
            <Footer/>
            <Toolbar
                className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center border-none
                bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-[600px] max-w-[90vw] sm:w-[400px] px-4 py-2"/>
        </div>
    );
}

export default HomePage;