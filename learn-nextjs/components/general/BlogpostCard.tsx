'use client';

import Link from "next/link";
import Image from "next/image";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { DeleteButton } from "./DeleteButton";

interface BlogPostProps {
  data: {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    authorId: string;
    authorName: string;
    authorImage: string;
    createdAt: Date;
    updatedAt: Date;
  }
}

export default function BlogPostCard({ data }: BlogPostProps) {
  const { user } = useKindeAuth();

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <Image 
          src={data.imageUrl} 
          alt="Image for blog" 
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <Link href={`/post/${data.id}`}>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 hover:text-blue-600">
              {data.title}
            </h3>
          </Link>
          {user && user.id === data.authorId && (
            <DeleteButton postId={data.id} />
          )}
        </div>
      </div>

      <div className="px-4 pb-4">
        <p className="mb-4 text-sm text-gray-600 line-clamp-3">
          {data.content}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative size-8 overflow-hidden rounded-full">
              <Image
                src={data.authorImage} 
                alt={data.authorName}
                fill
                className="object-cover" 
              />
            </div>
            <p className="text-sm font-medium text-gray-700">{data.authorName}</p>
          </div>

          <time className="text-xs text-gray-500">
            {new Intl.DateTimeFormat('en-IN', {
              year: 'numeric',
              month: 'short',
              day: "numeric"
            }).format(new Date(data.createdAt))}
          </time>
        </div>
      </div>
    </div>
  );
}