'use client';
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { AiFillEdit, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import styles from "./PostCard.module.scss";
import { useRouter } from "next/navigation";
import { PostType } from "@/libs/types";
import toast from "react-hot-toast";

interface PostCardProps {
    post: PostType;
    setIsAddEditPostModalOpen?: Dispatch<SetStateAction<{ visible: boolean; id: string | null; }>>;
}

const PostCard: React.FC<PostCardProps> = ({ post, setIsAddEditPostModalOpen }) => {
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
            toast.success("Post removed from shortlist");
        } else {
            updatedList = [...shortlistedPosts, post.id];
            toast.success("Post added to shortlist");
        }

        localStorage.setItem("shortlistedPosts", JSON.stringify(updatedList));
        setIsShortlisted(!isShortlisted);
    };

    const handleCardClick = () => {
        router.push(`/posts/${post.id}`);
    };

    return (
        <div className={styles.card} onClick={handleCardClick}>
            <div className={styles.titleContainer}>
                <h2>{post.title}</h2>
                <span
                    className={styles.editIcon}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (setIsAddEditPostModalOpen) {
                            setIsAddEditPostModalOpen({
                                visible: true, id: post.id as unknown as string
                            });
                        }
                    }}
                >
                    <AiFillEdit />
                </span>
            </div>
            <p>{post.body.slice(0, 100)}...</p>
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
