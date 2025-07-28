import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

import { useUser } from '@/hooks/useUser'
import api from '@/lib/api'
import errorLogger from '@/utils/errorLogger'

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { refreshUser } = useUser()
  const navigate = useNavigate()
  const [errors, setErrors] = useState<string[]>([]);

  const handleSignup = async (e: React.FormEvent) => {

    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const username = (form.username as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;
    try {
      await api.post(`/auth/signup`, { username: username, password: password });
      refreshUser()
      navigate('/my-tanks');
    } catch (error: any) {
      const caught_errors = errorLogger(error, 'alert');
      setErrors(caught_errors);
    }
  };

  return (
    <div {...props}>
      <form className="flex flex-col gap-6" onSubmit={handleSignup}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign up to ParamLogger</h1>
        <p className="text-muted-foreground text-sm text-pretty">
          Enter your information below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        {errors.length > 0 ? 
        <div className='text-red-500 text-muted-foreground text-center text-xs'>
            {errors.map((message) => {
                return (
                  <>
                    <Card className="rounded-md py-4 px-8 bg-red-100 border border-red-300">
                      <div className="flex justify-between">
                        <div>
                          {message}
                        </div>
                      </div>
                    </Card>
                    <br/>
                  </>
                )
            })}
        </div>
        : null}
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="username"
            placeholder="xXxYasuoOneTrickxXx"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
              {/* <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a> */}
            </div>
            <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Continue
        </Button>
        {/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Login with GitHub
        </Button> */}
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </form>
    </div>
  )
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Sign up to ParamLogger</CardTitle>
        </CardHeader>
        <CardContent>
          {errors.length > 0 ? 
          <div className='text-red-500 pb-8'>
              {errors.map((message) => {
                  return <>&lt;{message}&gt;</>
              })}
          </div>
          : null}
          <form onSubmit={handleSignup}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="username"
                  placeholder="xXxYasuoOneTrickxXx"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Continue
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Continue with Google
                </Button> */}
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
