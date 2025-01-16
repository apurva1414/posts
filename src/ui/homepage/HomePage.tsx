'use client';
import { useGetAllPosts } from "@/hooks";
import styles from "./HomePage.module.scss";
import PostCard from "../common/components/post-card/PostCard";
import { PostType } from "@/libs/types";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Oval } from "react-loader-spinner";

const HomePage = () => {
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetAllPosts();
    const [searchQuery, setSearchQuery] = useState("");

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <Oval color="#00BFFF" height={50} width={50} />
            </div>
        );
    } if (error) return <p>Failed to load posts.</p>;

    const filteredPosts = data?.pages.flatMap(page => page.posts).filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <div className={styles.homePageContainer}>
            <div className={styles.searchContainer}>
                <div className={styles.searchBoxIconContainer}>
                    <input
                        type="text"
                        placeholder="Search posts from title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    <FaSearch color="" size={12} className={styles.searchIcon} />
                </div>
            </div>
            <div className={styles.cardsContainer}>
                {filteredPosts?.length ? (
                    filteredPosts.map((post: PostType) => (
                        <PostCard key={post.id} post={post} />
                    ))
                ) : (
                    <p className={styles.noPostsMessage}>No posts found</p>
                )}
            </div>
            {hasNextPage && (
                <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className={styles.loadMoreButton}
                >
                    {isFetchingNextPage ? "Loading more..." : "Load More"}
                </button>
            )}
        </div>
    );
};

export default HomePage;
