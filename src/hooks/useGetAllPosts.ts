import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "@/libs/axios";

const fetchPosts = async ({ pageParam = 0 }: { pageParam?: number }) => {
  const { data } = await axiosInstance.get("/posts", {
    params: {
      skip: pageParam,
      limit: 10,
    },
  });
  return data;
};

export const useGetAllPosts = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { skip, limit, total } = lastPage;
      const nextSkip = skip + limit;
      return nextSkip < total ? nextSkip : undefined;
    },
  });
};
