import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "@/libs/axios";

const fetchPosts = async ({ pageParam = 1 }: { pageParam?: number }) => {
  const { data } = await axiosInstance.get("/posts", {
    params: {
      _limit: 10,
      _page: pageParam,
    },
  });
  return data;
};

export const useGetAllPosts = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const isLastPage = lastPage.length < 10;
      return isLastPage ? undefined : allPages.length + 1;
    },
  });
};
