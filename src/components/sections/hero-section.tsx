import {Button} from "@/components/ui/button.tsx";
import {ArrowRight} from "lucide-react";
import {BlogPosts} from "@/types/blogposts.ts";
import {useNavigate} from "react-router";

function HeroSection() {
    const navigate = useNavigate();

    return (
        <section className="bg-background py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-10">
                    {/* Text Content */}
                    <div className="md:w-7/12">
                        <div className="mb-4">
                          <span
                              className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-secondary rounded-full">
                            Featured
                          </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                            {BlogPosts[0].title}
                        </h1>

                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            {BlogPosts[0].excerpt}
                        </p>

                        <div className="flex flex-wrap gap-4 items-center">
                            <Button variant="default"
                                    className="w-full md:w-auto flex items-center justify-center cursor-pointer"
                                    onClick={() => navigate(`/blog/${BlogPosts[0].id}`)}>
                                Read More <ArrowRight className="ml-2 h-4 w-4"/>
                            </Button>
                        </div>
                    </div>

                    <div className="md:w-5/12">
                        <div className="relative">
                            {BlogPosts[0].image && BlogPosts[0].image ? (
                                <img
                                    src={BlogPosts[0].image}
                                    alt={BlogPosts[0].title || "Blog post image"}
                                    className="w-full h-auto object-cover rounded-lg"
                                />
                            ) : (
                                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-500">No image available</span>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
        ;
};

export default HeroSection;