"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import { tags } from "@/constants/post.constant";
import { useCreatePostMutation } from "@/services/post.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  content: z.string().min(10, {
    message: "Post content must contain at least 10 characters.",
  }),
  tags: z.array(z.string()).min(1, {
    message: "At least one tag is required.",
  }),
  //   image: z.string().optional(),
});

export function CreatePostForm() {
  const [createPost, { isLoading }] = useCreatePostMutation();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      //   image: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await createPost(values);
    if (res.data) {
      router.push(`/posts/${res.data.id}`);
    }
  }

  return (
    <div className='w-full bg-primary-theme border-none text-white'>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter post content'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Here you can write the main text of your post.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='tags'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <MultiSelect options={tags} {...field} />
                  </FormControl>
                  <FormDescription>Select tags for your post</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              disabled={isLoading}
              className='w-full bg-dark text-white cursor-pointer'
            >
              {isLoading ? "Publishing..." : "Publish post"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
