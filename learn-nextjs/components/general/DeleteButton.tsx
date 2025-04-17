'use client';

import { deletePost } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteButtonProps {
  postId: string;
  authorId: string;
  currentUserId: string;
}

export function DeleteButton({ postId, authorId, currentUserId }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      setIsDeleting(true);
      await deletePost(postId);
      router.push('/dashboard'); // Redirect to dashboard after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 disabled:opacity-50 transition-colors"
    >
      {isDeleting ? "Deleting..." : "Delete Post"}
    </button>
  );
}