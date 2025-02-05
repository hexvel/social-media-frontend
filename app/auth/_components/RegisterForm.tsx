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
import { isErrorWithMessage } from "@/lib/utils";
import { useRegisterMutation } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z
  .object({
    email: z.string().email("Email is not valid"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export const RegisterForm = () => {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await registerUser({
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
      }).unwrap();
      toast.success("Account created successfully");
      router.push("/auth/login");
    } catch (error) {
      const isError = isErrorWithMessage(error);

      if (isError) {
        toast.error(error.data.message);
      }
    }
  };

  return (
    <div className='flex items-center justify-center min-h-[450px] w-full'>
      <div className='w-full px-4 md:px-6 py-8 shadow-lg rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 max-w-md mx-auto'>
        <div className='mb-8 text-center'>
          <h2 className='text-4xl font-medium tracking-tight mb-2'>
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
                      disabled={isLoading}
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
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-muted-foreground'>
                    First name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
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
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-muted-foreground'>
                    Last name
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      type='text'
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
                      disabled={isLoading}
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
                disabled={isLoading}
                className='cursor-pointer w-full h-11 bg-primary hover:bg-primary/90 transition-colors'
              >
                {isLoading ? (
                  <div className='flex items-center justify-center gap-2'>
                    <div className='w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin' />
                    <span>Register...</span>
                  </div>
                ) : (
                  "Register"
                )}
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
