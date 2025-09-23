import NavBar from "@/components/nav-bar.tsx";
import BlogSection from "@/components/sections/blog-section.tsx";


function BlogPage() {
    return (
        <div className="min-h-screen bg-background">
            <NavBar/>
            <BlogSection/>
        </div>
    );
}

export default BlogPage;