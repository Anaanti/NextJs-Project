import { handleSubmission } from "@/app/actions";
import { Submitbutton } from "@/components/general/Submitbutton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";

export default function CreateBlogroute(){
   return(
    <div>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>
            <CardDescription>
              Create a new post to share with the world
            </CardDescription>
          </CardTitle>
        </CardHeader>
        <CardContent>
            <form className= "flex flex-col gap-4" action={handleSubmission}>
              <div className="flex flex-col gap-2">
                <Label>Title</Label>
                <Input name="title" required type="text" placeholder="Title"/>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Content</Label>
                <Textarea name="content" required placeholder="Content" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Image URL</Label>
                <Input name="url" required placeholder="Image url"/>
              </div>

            <Submitbutton />

            </form>
        </CardContent>
      </Card>
    </div>
   )
}