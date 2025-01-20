'use client';
import { useGetAllPosts } from "@/hooks";
import styles from "./HomePage.module.scss";
import PostCard from "../common/components/post-card/PostCard";
import { PostType } from "@/libs/types";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Oval } from "react-loader-spinner";
import AddEditPostModal from "../common/components/add-edit-post-modal/AddEditPostModal";

const HomePage = () => {
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    } = useGetAllPosts();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isAddEditPostModalOpen, setIsAddEditPostModalOpen] = useState<{ visible: boolean; id: string | null; }>({
        visible: false,
        id: null,
    });
    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <Oval color="#00BFFF" height={50} width={50} />
            </div>
        );
    } if (error) return <p>Failed to load posts.</p>;

    const filteredPosts = data?.pages?.flatMap(page => page).filter(post =>
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
            <div className={styles.postsContainer}>
                <div className={styles.createPost}>
                    <button onClick={() => setIsAddEditPostModalOpen({
                        visible: true,
                        id: null
                    })} className={styles.createPostButton}>Create Post</button>
                </div>
                <div className={styles.cardsContainer}>
                    {filteredPosts?.length ? (
                        filteredPosts.map((post: PostType) => (
                            <PostCard key={post.id} post={post} setIsAddEditPostModalOpen={setIsAddEditPostModalOpen} />
                        ))
                    ) : (
                        <p className={styles.noPostsMessage}>No posts found</p>
                    )}
                </div>
            </div>
            {hasNextPage && (
                <div className={styles.loadMoreContainer}>
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className={styles.loadMoreButton}
                    >
                        {isFetchingNextPage ? "Loading more..." : "Load More"}
                    </button>
                </div>
            )}
            <AddEditPostModal isOpen={isAddEditPostModalOpen} setIsOpen={setIsAddEditPostModalOpen} refetch={refetch} />
        </div>
    );
};

export default HomePage;
