import {NavBar} from "@/components/nav-bar.tsx";
import HeroSection from "@/components/sections/hero-section.tsx";
import BlogSection from "@/components/sections/blog-section.tsx";
import Footer from "@/components/sections/footer.tsx";

function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            <NavBar/>
            <HeroSection/>
            <BlogSection/>
            <Footer/>

        </div>
    );
}

export default HomePage;