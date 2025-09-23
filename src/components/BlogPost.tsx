import {Link, useParams} from "react-router-dom";
import {ArrowLeft, Calendar, Clock, Tag} from "lucide-react";
import {Button} from "@/components/ui/button";
import {BlogPosts} from "@/types/blogposts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import NavBar from "@/components/nav-bar.tsx";

const BlogPost = () => {
    const {id} = useParams<{ id: string }>();
    const post = BlogPosts.find((post) => post.id === id);

    if (!post) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Post not found</h1>
                <Link to="/blog">
                    <Button>Back to Blog</Button>
                </Link>
            </div>
        );
    }

    return (
        <>
            <NavBar/>
            <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
                <Link to="/" className="inline-block mb-6">
                    <Button variant="ghost" className="flex items-center gap-2 cursor-pointer">
                        <ArrowLeft className="h-4 w-4"/>
                        Back to Blog
                    </Button>
                </Link>

                <header className="mb-8">
                    {post.category && (
                        <div className="flex items-center text-sm text-blue-600 font-medium mb-4">
                            <Tag className="h-4 w-4 mr-1"/>
                            {post.category}
                        </div>
                    )}

                    <h1 className="text-4xl font-bold text-primary mb-4">{post.title}</h1>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src="https://github.com/shadcn.png"/>
                                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{post.author}</span>
                        </div>

                        <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1"/>
                            <span>{post.date}</span>
                        </div>

                        <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1"/>
                            <span>{post.readTime}</span>
                        </div>
                    </div>

                    {post.image && (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-64 object-cover rounded-xl mb-6"
                        />
                    )}
                </header>

                <div className="prose max-w-none">
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                        {post.excerpt}
                    </p>

                    {/* Full content would go here - for demo, we'll repeat the excerpt */}
                    <p className="mb-4">
                        JavaScript frameworks make development easy with extensive features and functionalities.
                        They provide structure and ready-made components that help developers build applications faster.
                    </p>

                    <p className="mb-4">
                        In today's fast-paced development environment, choosing the right framework can significantly
                        impact your project's success. Let's explore some of the most popular options available.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Why Use a Framework?</h2>

                    <p className="mb-4">
                        Frameworks provide a structured foundation for your applications, enforcing best practices
                        and reducing the amount of code you need to write from scratch.
                    </p>

                    <p>
                        They typically include features like routing, state management, and built-in optimization,
                        allowing developers to focus on building unique features rather than reinventing the wheel.
                    </p>
                </div>
            </article>
        </>
    );
};

export default BlogPost;