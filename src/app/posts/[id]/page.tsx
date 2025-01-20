import { Metadata } from "next";
import { PostDetails } from "@/ui";
import axiosInstance from "@/libs/axios";
import { PageProps } from "../../../../.next/types/app/posts/[id]/page";


export async function generateMetadata(pageProps: PageProps): Promise<Metadata> {
    const { id } = await pageProps.params;

    try {
        const response = await axiosInstance.get(`/posts/${id}`);
        const post = response.data;
        return {
            title: post?.title || "Post Details",
            description: post?.body || "Read more about this post.",
            openGraph: {
                type: "article",
                url: `https://posts-fe.netlify.app/posts/${id}`,
                title: post?.title,
                description: post?.body,
            },
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
