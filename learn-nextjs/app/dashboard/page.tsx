import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "../utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import BlogPostCard from "@/components/general/BlogpostCard";

async function getData(userid: string){
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = await prisma.blogPost.findMany({
    where : {
      authorId : userid,
    },
    orderBy: {
      createdAt: "desc",
    }
  });
  return data;
}

export default async function DashboardPage() {
  const {getUser} = getKindeServerSession();
  const user = await getUser();
  
  if (!user) {
    return <div>Please sign in to view your dashboard</div>;
  }

  const data = await getData(user?.id);

  return (

    <div>
     <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Your Blog Articles</h2>

        <Link className={buttonVariants()}
        href="/create">
        Create Post 
        </Link>
     </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item)=>(
        <BlogPostCard data={item} key={item.id}/>
      ))}
    </div>

    </div>
  );
}
