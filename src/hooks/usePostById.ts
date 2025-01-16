import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/libs/axios";

const fetchPostById = async (id: string) => {
  const { data } = await axiosInstance.get(`/posts/${id}`);
  return data;
};

export const usePostById = (id: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
    enabled: !!id,
  });
};
