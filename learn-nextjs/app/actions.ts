"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation"; // Add this import

export async function handleSubmission(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  // Check if user exists
  if (!user) {
    // Handle the case when user is not authenticated
    return redirect("/auth/login"); // Redirect to login page or handle accordingly
  }

  const title = formData.get('title');
  const content = formData.get('content');
  const url = formData.get('url');
  
  const data = await prisma.blogPost.create({
    data: {
      title: title as string,
      content: content as string,
      imageUrl: url as string,
      authorId: user.id,
      authorImage: user.picture || "",
      authorName: user.given_name || "Anonymous", 
    },
  });

  return redirect("/dashboard");
}