import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { DeleteButton } from "@/components/general/DeleteButton";
import Image from "next/image";
import { prisma } from "@/app/utils/db";
import { notFound } from "next/navigation";

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
          {user && <DeleteButton 
            postId={post.id} 
            authorId={post.authorId} 
            currentUserId={user.id} 
          />}
        </div>

        {/* Image */}
        <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Author Info */}
        <div className="flex items-center space-x-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Image
              src={post.authorImage}
              alt={post.authorName}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{post.authorName}</p>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="prose max-w-none">
          {post.content}
        </div>
      </div>
    </div>
  );
}