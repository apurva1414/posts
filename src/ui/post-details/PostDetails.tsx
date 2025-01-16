'use client';
import { useParams, useRouter } from 'next/navigation';
import { usePostById } from '@/hooks';
import { useState, useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import styles from './PostDetails.module.scss';
import { FaArrowLeft } from 'react-icons/fa';

export default function PostDetails() {
    const { id } = useParams();
    const router = useRouter();
    const { data: post, isLoading, error } = usePostById(id as string);
    const [isShortlisted, setIsShortlisted] = useState(false);

    useEffect(() => {
        const shortlistedPosts = JSON.parse(localStorage.getItem('shortlistedPosts') || '[]');
        setIsShortlisted(shortlistedPosts.includes(Number(id)));
    }, [id]);

    const handleShortlist = () => {
        const shortlistedPosts = JSON.parse(localStorage.getItem('shortlistedPosts') || '[]');
        let updatedList;

        if (isShortlisted) {
            updatedList = shortlistedPosts.filter((postId: number) => postId !== Number(id));
        } else {
            updatedList = [...shortlistedPosts, Number(id)];
        }

        localStorage.setItem('shortlistedPosts', JSON.stringify(updatedList));
        setIsShortlisted(!isShortlisted);
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Failed to load post.</p>;

    return (
        <div className={styles.postMainContainer}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={() => router.back()}>
                    <FaArrowLeft className={styles.backIcon} />
                    <span>Back</span>
                </button>
            </div>

            <div className={styles.postContainer}>
                <h2>{post?.title}</h2>
                <p>{post?.body}</p>
                <div className={styles.meta}>
                    <span><strong>Views:</strong> {post?.views}</span>
                    <span><strong>Likes:</strong> {post?.reactions.likes}</span>
                    <span><strong>Dislikes:</strong> {post?.reactions.dislikes}</span>
                </div>
                <div className={styles.tags}>
                    <h3>Tags:</h3>
                    {post?.tags.map((tag: string) => (
                        <span key={tag} className={styles.tag}>
                            #{tag}
                        </span>
                    ))}
                </div>

                <div
                    className={styles.shortlistIcon}
                    onClick={handleShortlist}
                    title={isShortlisted ? 'Remove from Shortlist' : 'Add to Shortlist'}
                >
                    {isShortlisted ? (
                        <AiFillHeart className={styles.heartIconFilled} />
                    ) : (
                        <AiOutlineHeart className={styles.heartIconOutline} />
                    )}
                </div>
            </div>
        </div>
    );
}
