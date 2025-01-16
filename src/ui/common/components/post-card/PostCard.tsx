'use client';
import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import styles from "./PostCard.module.scss";
import { useRouter } from "next/navigation";
import { PostType } from "@/libs/types";

interface PostCardProps {
    post: PostType;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const [isShortlisted, setIsShortlisted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const shortlistedPosts = JSON.parse(localStorage.getItem("shortlistedPosts") || "[]");
        setIsShortlisted(shortlistedPosts.includes(post.id));
    }, [post.id]);

    const handleShortlist = (event: React.MouseEvent) => {
        event.stopPropagation();
        const shortlistedPosts = JSON.parse(localStorage.getItem("shortlistedPosts") || "[]");
        let updatedList;

        if (isShortlisted) {
            updatedList = shortlistedPosts.filter((id: number) => id !== post.id);
        } else {
            updatedList = [...shortlistedPosts, post.id];
        }

        localStorage.setItem("shortlistedPosts", JSON.stringify(updatedList));
        setIsShortlisted(!isShortlisted);
    };

    const handleCardClick = () => {
        router.push(`/posts/${post.id}`);
    };

    return (
        <div className={styles.card} onClick={handleCardClick}>
            <h2>{post.title}</h2>
            <p>{post.body.slice(0, 100)}...</p>
            <div className={styles.meta}>
                <span>Views: {post.views}</span>
                <span>Likes: {post.reactions.likes}</span>
                <span>Dislikes: {post.reactions.dislikes}</span>
            </div>
            <div className={styles.tags}>
                {post.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                        #{tag}
                    </span>
                ))}
            </div>
            <div
                className={styles.shortlistIcon}
                onClick={handleShortlist}
                title={isShortlisted ? "Remove from Shortlist" : "Add to Shortlist"}
            >
                {isShortlisted ? (
                    <AiFillHeart className={styles.heartIconFilled} />
                ) : (
                    <AiOutlineHeart className={styles.heartIconOutline} />
                )}
            </div>
        </div>
    );
};

export default PostCard;
