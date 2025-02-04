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
import { useToast } from "@/hooks/use-toast";
import { isErrorWithMessage } from "@/lib/utils";
import { useLoginMutation } from "@/services/auth";

const formSchema = z.object({
  email: z.string().email("Email is not valid"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type FormValues = z.infer<typeof formSchema>;

export const LoginForm = () => {
  const [loginUser, { isLoading }] = useLoginMutation();
  const { toast } = useToast();

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
      toast({
        title: "Success",
        description: `Welcome ${res.user.firstName}`,
      });
    } catch (error) {
      const isError = isErrorWithMessage(error);

      if (isError) {
        toast({
          title: "Error",
          description: error.data.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className='flex items-center justify-center min-h-[450px] w-full'>
      <div className='w-full px-4 md:px-6 py-8 shadow-lg rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 max-w-md mx-auto'>
        <div className='mb-8 text-center'>
          <h2 className='text-2xl font-bold tracking-tight mb-2'>
            Добро пожаловать
          </h2>
          <p className='text-muted-foreground text-sm'>
            Войдите в свой аккаунт для продолжения
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
                    Пароль
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
                    <span>Вход...</span>
                  </div>
                ) : (
                  "Войти"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
