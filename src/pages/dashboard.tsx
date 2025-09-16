import {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Calendar, Clock, Edit, FileText, Plus, Save, Tag, Trash2, User} from "lucide-react";
import {type BlogPost, BlogPosts} from "@/types/blogposts";
import {NavBar} from "@/components/nav-bar.tsx";
import {toast} from "sonner";

export function BlogDashboard() {
    const sortedInitialPosts = [...BlogPosts].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const [posts, setPosts] = useState<BlogPost[]>(sortedInitialPosts);
    const [newPost, setNewPost] = useState<Omit<BlogPost, 'id'>>({
        title: "",
        excerpt: "",
        content: "",
        author: "",
        date: new Date().toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'}),
        readTime: "5 min read",
        category: "",
        image: ""
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setNewPost({...newPost, [name]: value});
    };

    const handleAddPost = () => {
        if (!newPost.title || !newPost.excerpt || !newPost.author) {
            toast.error("Please fill in required fields: Title, Excerpt, and Author");
            return;
        }

        const post: BlogPost = {
            ...newPost,
            id: Date.now().toString(),
        };

        // Add new post at the beginning of the array (top of the list)
        setPosts([post, ...posts]);
        toast.success("Post created successfully");
        resetForm();
    };

    const handleEditPost = (post: BlogPost) => {
        setNewPost({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            date: post.date,
            readTime: post.readTime,
            category: post.category,
            image: post.image || "",
        });
        setIsEditing(true);
        setEditingId(post.id);
    };

    const handleUpdatePost = () => {
        if (!newPost.title || !newPost.excerpt || !newPost.author) {
            toast.error("Please fill in required fields: Title, Excerpt, and Author");
            return;
        }
        setPosts(
            posts.map((post) =>
                post.id === editingId ? {...newPost, id: editingId} : post
            )
        );
        toast.success("Post updated successfully");
        resetForm();
    };

    const handleDeletePost = (id: string) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            setPosts(posts.filter((post) => post.id !== id));
        }
    };

    const resetForm = () => {
        setNewPost({
            title: "",
            excerpt: "",
            content: "",
            author: "",
            date: new Date().toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
            }),
            readTime: "5 min read",
            category: "",
            image: "",
        });
        setIsEditing(false);
        setEditingId("");
    };

    return (
        <>
            <NavBar/>
            <div className="container mx-auto px-4 md:px-6 py-10 max-w-6xl">
                <h1 className="text-3xl font-semibold tracking-tight mb-10">
                    Blog Dashboard
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">
                    {/* Form Section */}
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-xl font-medium ">
                                {isEditing ? "Edit Post" : "Create New Post"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={newPost.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter post title"
                                    className="rounded-lg"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Excerpt *</Label>
                                <Textarea
                                    id="excerpt"
                                    name="excerpt"
                                    value={newPost.excerpt}
                                    onChange={handleInputChange}
                                    placeholder="Enter short description"
                                    rows={2}
                                    className="rounded-lg"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Content</Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    value={newPost.content}
                                    onChange={handleInputChange}
                                    placeholder="Enter full content"
                                    rows={4}
                                    className="rounded-lg"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="author">Author *</Label>
                                    <Input
                                        id="author"
                                        name="author"
                                        value={newPost.author}
                                        onChange={handleInputChange}
                                        placeholder="Author name"
                                        className="rounded-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input
                                        id="category"
                                        name="category"
                                        value={newPost.category}
                                        onChange={handleInputChange}
                                        placeholder="Category"
                                        className="rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Input
                                        id="date"
                                        name="date"
                                        value={newPost.date}
                                        onChange={handleInputChange}
                                        className="rounded-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="readTime">Read Time</Label>
                                    <Input
                                        id="readTime"
                                        name="readTime"
                                        value={newPost.readTime}
                                        onChange={handleInputChange}
                                        placeholder="5 min read"
                                        className="rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">Image URL (optional)</Label>
                                <Input
                                    id="image"
                                    name="image"
                                    value={newPost.image}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com/image.jpg"
                                    className="rounded-lg"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                {isEditing ? (
                                    <>
                                        <Button
                                            onClick={handleUpdatePost}
                                            className="flex items-center gap-2"
                                        >
                                            <Save size={16}/>
                                            Update
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={resetForm}
                                            className="rounded-lg"
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        onClick={handleAddPost}
                                        className="flex items-center gap-2 rounded-lg"
                                    >
                                        <Plus size={16}/>
                                        Add Post
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Posts List */}
                    {/* Posts List - Newest posts will appear at the top */}
                    <Card className="shadow-none rounded-xl">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-medium">
                                Published Posts ({posts.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                {posts.length === 0 ? (
                                    <div className="text-center py-12">
                                        <FileText size={48} className="mx-auto mb-4" />
                                        <p className=" text-sm">No posts yet. Create your first post.</p>
                                    </div>
                                ) : (
                                    posts.map((post) => (
                                        <Card
                                            key={post.id}
                                            className="rounded-xl p-5 transition-colors group hover:shadow"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="font-medium text-lg leading-tight pr-4">{post.title}</h3>
                                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEditPost(post)}
                                                        className="h-8 w-8 p-0 cursor-pointer"
                                                    >
                                                        <Edit size={14} />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDeletePost(post.id)}
                                                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600/80 hover:bg-red-50"
                                                    >
                                                        <Trash2 size={14} />
                                                    </Button>
                                                </div>
                                            </div>

                                            <p className="text-sm mb-4 line-clamp-2 leading-relaxed">{post.excerpt}</p>

                                            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                                                <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User size={12} />
                            {post.author}
                        </span>
                                                    <span className="flex items-center gap-1">
                          <Calendar size={12} />
                                                        {post.date}
                        </span>
                                                    <span className="flex items-center gap-1">
                          <Clock size={12} />
                                                        {post.readTime}
                        </span>
                                                </div>
                                            </div>

                                            {post.category && (
                                                <div className="mt-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100">
                          <Tag size={10} className="mr-1" />
                            {post.category}
                        </span>
                                                </div>
                                            )}
                                        </Card>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default BlogDashboard;
