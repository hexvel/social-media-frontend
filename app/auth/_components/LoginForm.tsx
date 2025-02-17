"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { setProfileUser } from "@/features/users/userSlice";
import { isErrorWithMessage } from "@/lib/utils";
import { useLoginMutation } from "@/services/auth.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const formSchema = z.object({
  email: z.string().email("Email is not valid"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type FormValues = z.infer<typeof formSchema>;

export const LoginForm = () => {
  const [loginUser, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await loginUser(values).unwrap();
      toast.success(`Welcome ${res.user.firstName}`);
      dispatch(setProfileUser(res.user));
      router.push("/");
    } catch (error) {
      const isError = isErrorWithMessage(error);

      if (isError) {
        toast.error(error.data.message);
      }
    }
  };

  return (
    <div className='flex items-center justify-center min-h-[450px] w-full'>
      <div className='w-full px-4 mx-4 md:mx-0 md:px-6 py-8 shadow-lg rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 max-w-md'>
        <div className='mb-8 text-center'>
          <h2 className='text-4xl font-medium tracking-tight mb-2'>Welcome</h2>
          <p className='text-muted-foreground text-sm'>Login to continue</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-muted-foreground'>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      placeholder='name@example.com'
                      disabled={isLoading}
                      className='h-11 bg-white/5 border-white/10 focus-visible:ring-white/20'
                    />
                  </FormControl>
                  <FormMessage className='text-red-400' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-muted-foreground'>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='password'
                      disabled={isLoading}
                      className='h-11 bg-white/5 border-white/10 focus-visible:ring-white/20'
                      placeholder='туц туц туц'
                    />
                  </FormControl>
                  <FormMessage className='text-red-400' />
                </FormItem>
              )}
            />
            <div className='pt-2'>
              <Button
                type='submit'
                className='cursor-pointer w-full h-11 bg-primary hover:bg-primary/90 transition-colors'
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className='flex items-center justify-center gap-2'>
                    <div className='w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin' />
                    <span>Login...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
            <div className='text-center text-sm text-muted-foreground'>
              Don't have an account?{" "}
              <Link
                href='/auth/register'
                className='text-white hover:underline'
              >
                Register
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
