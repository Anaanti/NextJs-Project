import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { prisma } from "@/app/utils/db";
import { notFound } from "next/navigation";
import { DeleteButton } from "@/components/general/DeleteButton";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  const post = await prisma.blogPost.findUnique({
    where: { id: params.id }
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Title and Delete Button */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          {user && user.id === post.authorId && (
            <DeleteButton 
              postId={post.id} 
              authorId={post.authorId} 
              currentUserId={user.id} 
            />
          )}
        </div>

        {/* Rest of your post content */}
        {/* ... */}
      </div>
    </div>
  );
}