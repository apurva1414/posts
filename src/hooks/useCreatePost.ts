import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/libs/axios";

const createPost = async (newPostData: {
  title: string;
  body: string;
  userId: number;
}) => {
  const { data } = await axiosInstance.post("/posts", newPostData);
  return data;
};

export const useCreatePost = () => {
  return useMutation({
    mutationKey: ["create-post"],
    mutationFn: createPost,
  });
};
