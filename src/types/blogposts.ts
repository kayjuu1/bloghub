// Mock data that will eventually come from backend
export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime?: string;
    category?: string;
    image?: string;
    content?: string;
}

export const BlogPosts: BlogPost[] = [
    {
        id: "1",
        title: "Breaking Into Product Design: Advice from Untitled Founder, Frankie",
        excerpt: "Let's get one thing out of the way: you don't need a fancy Bachelor's Degree to get into\n" +
            "                            Product Design. We sat down with Frankie Sullivan to talk about gatekeeping in\n" +
            "                            product design and how anyone can get into this growing industry.",
        author: "Jonathan Wills",
        date: "19 Jan 2022",
        readTime: "5 min read",
        category: "Project Management",
        image: "/images/download.jpeg"
    },
    {
        id: "2",
        title: "Migrating to Linear 101",
        excerpt: "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
        author: "Jonathan Wills",
        date: "19 Jan 2022",
        readTime: "5 min read",
        category: "Project Management",
        image: "/images/441efdffd00e3fd0f4b9b172d70e92e9.jpg"
    },
    {
        id: "3",
        title: "Building your API Stack",
        excerpt: "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
        author: "Lana Steiner",
        date: "18 Jan 2022",
        readTime: "7 min read",
        category: "Development"
    },
    {
        id: "4",
        title: "Bill Walsh leadership lessons",
        excerpt: "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
        author: "Eve Wilkins",
        date: "18 Jan 2022",
        readTime: "8 min read",
        category: "Leadership"
    },
    {
        id: "5",
        title: "PM mental models",
        excerpt: "Mental models are simple expressions of complex processes or relationships.",
        author: "Eve Wilkins",
        date: "18 Jan 2022",
        readTime: "6 min read",
        category: "Product Management"
    },
    {
        id: "6",
        title: "What is Wireframing?",
        excerpt: "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
        author: "Lana Steiner",
        date: "18 Jan 2022",
        readTime: "9 min read",
        category: "Design"
    },
    {
        id: "7",
        title: "How collaboration makes us better designers",
        excerpt: "Collaboration can make our teams stronger, and our individual designs better.",
        author: "Jonathan Wills",
        date: "19 Jan 2022",
        readTime: "5 min read",
        category: "Design"
    },
    {
        id: "8",
        title: "Our top 10 Javascript frameworks to use",
        excerpt: "JavaScript frameworks make development easy with extensive features and functionalities.",
        author: "Lana Steiner",
        date: "18 Jan 2022",
        readTime: "10 min read",
        category: "Development"
    },
    {
        id: "9",
        title: "Podcast: Creating a better CX Community",
        excerpt: "Starting a community doesn't need to be complicated, but how do you get started?",
        author: "Jonathan Wills",
        date: "19 Jan 2022",
        readTime: "4 min read",
        category: "Community"
    },
    {
        id: "10",
        title: "Our top 10 Javascript frameworks to use",
        excerpt: "JavaScript frameworks make development easy with extensive features and functionalities.",
        author: "Lana Steiner",
        date: "18 Jan 2022",
        readTime: "10 min read",
        category: "Development"
    },
    {
        id: "11",
        title: "Podcast: Creating a better CX Community",
        excerpt: "Starting a community doesn't need to be complicated, but how do you get started?",
        author: "Jonathan Wills",
        date: "19 Jan 2022",
        readTime: "4 min read",
        category: "Community"
    }
];