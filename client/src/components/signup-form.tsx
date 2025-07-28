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
