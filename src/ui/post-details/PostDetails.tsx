'use client';

import { useParams, useRouter } from 'next/navigation';
import { usePostById } from '@/hooks';
import { useState, useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaArrowLeft } from 'react-icons/fa';
import { Oval } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import styles from './PostDetails.module.scss';

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
            toast.success("Post removed from shortlist");
        } else {
            updatedList = [...shortlistedPosts, Number(id)];
            toast.success("Post added to shortlist");
        }

        localStorage.setItem('shortlistedPosts', JSON.stringify(updatedList));
        setIsShortlisted(!isShortlisted);
    };

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <Oval color="#00BFFF" height={50} width={50} />
            </div>
        );
    }
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
