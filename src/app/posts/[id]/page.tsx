import { PostDetails } from "@/ui";
import axiosInstance from "@/libs/axios";

export async function generateMetadata({ params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const response = await axiosInstance.get(`/posts/${id}`);
        const post = response.data;
        return {
            title: post?.title || "Post Details",
            description: post?.body || "Read more about this post.",
            type: "article",
            url: `https://posts-fe.netlify.app/posts/${id}`,
        };
    } catch (error) {
        console.error("Failed to fetch post data:", error);

        return {
            title: "Post Not Found",
            description: "Unable to fetch details for this post.",
        };
    }
}


export default function Home() {
    return (
        <PostDetails />
    );
}
