"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputPassword } from "@/components/ui/input";
import { useLogin } from "@/hooks/use-auth";
import { roleRedirect } from "@/lib/redirect";
import { loginSchema, LoginSchemaType } from "@/validator/user-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { mutateAsync: login, isPending, error } = useLogin();
  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    const res = await login(data);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    await fetch("/api/set-refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: res.refreshToken }),
    });
    toast.success("Login success.");
    roleRedirect(res.data.role as string);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="max-w-sm w-full flex flex-col items-center border rounded-lg px-6 py-8 shadow-sm/5 bg-card">
        <div className="text-center">
          <Logo />
        </div>
        <p className="mt-4 text-xl font-semibold tracking-tight">Log in</p>

        <Form {...form}>
          <form
            className="w-full space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputPassword
                      placeholder="Password"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4 w-full" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>
            {error && <p className="text-red-500">{error.message}</p>}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
