import {useState} from "react";
import {Calendar, ChevronRight, Tag} from "lucide-react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";
import {cn} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {type BlogPost, BlogPosts} from "@/types/blogposts.ts";
import {Link} from "react-router-dom";

const BlogSection = () => {
    const [posts] = useState<BlogPost[]>(BlogPosts);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;

    // Pagination calculations
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    // const totalPages = Math.ceil(posts.length / postsPerPage);

    // Function to simulate loading more posts
    const loadMorePosts = () => {
        setIsLoading(true);
        setCurrentPage(currentPage + 1);

    };

    // Fallback image for posts without images
    const fallbackImage = "/images/download.jpeg";

    return (
        <>
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-primary mb-4 tracking-tight">
                            Recent Blog Posts
                        </h2>
                        <p className="text-lg text-primary max-w-2xl mx-auto leading-relaxed">
                            Discover the latest insights, tips, and industry news from our expert team
                        </p>
                    </div>

                    {/* Blog Posts Grid */}
                    {/*{isLoading ? (*/}
                    {/*    <BlogSectionSkeleton/>*/}
                    {/*) : (*/}
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                            {currentPosts.map((post) => (
                                <Card
                                    key={post.id}
                                    className={cn(
                                        "group overflow-hidden transition-all duration-300",
                                        "hover:shadow-xl hover:-translate-y-1 border-0",
                                        "bg-primary` rounded-xl h-full flex flex-col shadow-none cursor-pointer"
                                    )}
                                >
                                    {/* Wrap content in Link for navigation */}
                                    <Link to={`/blog/${post.id}`} className="flex flex-col h-full">
                                        {/* Image with fallback */}
                                        <div className="relative w-full h-48 overflow-hidden rounded-2xl">
                                            <img
                                                src={post.image || fallbackImage}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                onError={(e) => {
                                                    e.currentTarget.src = fallbackImage;
                                                }}
                                            />
                                            {post.category && (
                                                <span
                                                    className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                                            <Tag className="h-3 w-3 inline-block mr-1"/>
                                                    {post.category}
                                        </span>
                                            )}
                                        </div>

                                        <CardHeader className="py-4 flex-grow">
                                            {/* Author and date info */}
                                            <div
                                                className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarImage src="https://github.com/shadcn.pg"/>
                                                        <AvatarFallback>{post.author.slice(0, 2)}</AvatarFallback>
                                                    </Avatar>
                                                    <span>{post.author}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 mr-1 text-gray-400"/>
                                                    <span>{post.date}</span>
                                                </div>
                                            </div>

                                            {/* Title and description */}
                                            <CardTitle
                                                className="text-xl font-semibold text-primary mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                {post.title}
                                            </CardTitle>
                                            <CardDescription
                                                className="text-muted-foreground line-clamp-3 leading-relaxed">
                                                {post.excerpt}
                                            </CardDescription>
                                        </CardHeader>

                                        <CardFooter className="pt-0">
                                            <Button variant="link" className="p-0 text-blue-600">
                                                Read more
                                                <ChevronRight className="ml-1 h-4 w-4"/>
                                            </Button>
                                        </CardFooter>
                                    </Link>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center space-y-4">
                            {indexOfLastPost < posts.length ? (
                                <Button
                                    onClick={loadMorePosts}
                                    disabled={isLoading}
                                    variant="outline"
                                    className="px-8 py-2 text-base font-medium border-blue-600 text-blue-600 hover:bg-blue-50"
                                >
                                    {isLoading ? (
                                        <>
                                            <div
                                                className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"/>
                                            Loading...
                                        </>
                                    ) : (
                                        <>
                                            Load more
                                            <ChevronRight className="ml-2 h-5 w-5"/>
                                        </>
                                    )}
                                </Button>
                            ) : (
                                <p className="text-gray-500 text-sm">No more posts to load.</p>
                            )}
                            <div className="text-sm text-gray-500">
                                Showing {indexOfFirstPost + 1} to {Math.min(indexOfLastPost, posts.length)} of {posts.length} posts
                            </div>
                        </div>
                    </>
                    {/*)}*/}
                </div>
            </section>
        </>
    );
};

// Skeleton loader for when data is being fetched
export const BlogSectionSkeleton = () => {
    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <Skeleton className="h-8 w-64 mx-auto mb-4"/>
                    <Skeleton className="h-4 w-96 mx-auto"/>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                        <Card key={i} className="bg-white rounded-xl">
                            <Skeleton className="h-48 w-full"/>
                            <CardHeader>
                                <Skeleton className="h-4 w-full mb-2"/>
                                <Skeleton className="h-6 w-3/4 mb-2"/>
                                <Skeleton className="h-4 w-full"/>
                                <Skeleton className="h-4 w-2/3"/>
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-6 w-24 rounded-full"/>
                            </CardContent>
                            <CardFooter>
                                <Skeleton className="h-4 w-20"/>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default BlogSection;