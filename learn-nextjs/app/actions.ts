"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function handleSubmission(formData: FormData) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return redirect("/api/auth/register"); 
    }

    const title = formData.get('title')?.toString();
    const content = formData.get('content')?.toString();
    const url = formData.get('url')?.toString();

    if (!title || !content) {
      throw new Error('Title and Content are required');
    }
    
    await prisma.blogPost.create({
      data: {
        title,
        content,
        imageUrl: url || "",
        authorId: user.id,
        authorImage: user.picture || "",
        authorName: user.given_name || "Anonymous", 
      },
    });

    return redirect("/dashboard");
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post');
  }
}

export async function deletePost(postId: string) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      throw new Error("Not authenticated");
    }

    // Verify the user owns the post before deleting
    const post = await prisma.blogPost.findUnique({
      where: { id: postId },
    });

    if (!post || post.authorId !== user.id) {
      throw new Error("Unauthorized or post not found");
    }

    await prisma.blogPost.delete({
      where: { id: postId },
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Failed to delete post");
  }
}