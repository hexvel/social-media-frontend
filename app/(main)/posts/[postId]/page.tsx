import { use } from "react";
import { PostContent } from "./_components/PostContent";

interface IPostPageProps {
  params: Promise<{
    postId: string;
  }>;
}

export default function PostPage({ params }: IPostPageProps) {
  const { postId } = use(params);

  return <PostContent postId={postId} />;
}
