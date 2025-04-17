'use client';

import { deletePost } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteButtonProps {
  postId: string;
}

export function DeleteButton({ postId }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      setIsDeleting(true);
      await deletePost(postId);
      router.refresh();
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
      className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors disabled:opacity-50 px-3 py-1 rounded-md hover:bg-red-50"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}