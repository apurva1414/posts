import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/libs/axios";

const updatePost = async (updatePostData: {
  id: string;
  title: string;
  body: string;
  userId: number;
}) => {
  const { data } = await axiosInstance.put(
    `/posts/${updatePostData?.id}`,
    updatePostData
  );
  return data;
};

export const useUpdatePost = () => {
  return useMutation({
    mutationKey: ["update-post"],
    mutationFn: updatePost,
  });
};
