"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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

const formSchema = z
  .object({
    email: z.string().email("Email is not valid"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export const RegisterForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    // Здесь будет логика регистрации
    console.log(values);
  };

  return (
    <div className='flex items-center justify-center min-h-[450px] w-full'>
      <div className='w-full px-4 md:px-6 py-8 shadow-lg rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 max-w-md mx-auto'>
        <div className='mb-8 text-center'>
          <h2 className='text-2xl font-bold tracking-tight mb-2'>
            Create account
          </h2>
          <p className='text-muted-foreground text-sm'>
            Fill in the form to create an account
          </p>
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
                      className='h-11 bg-white/5 border-white/10 focus-visible:ring-white/20'
                    />
                  </FormControl>
                  <FormMessage className='text-red-400' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-muted-foreground'>
                    Confirm password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='password'
                      className='h-11 bg-white/5 border-white/10 focus-visible:ring-white/20'
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
              >
                Register
              </Button>
            </div>

            <div className='text-center text-sm text-muted-foreground'>
              Already have an account?{" "}
              <Link href='/auth/login' className='text-white hover:underline'>
                Login
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
