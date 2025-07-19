import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from 'react-router-dom';

import api from '../lib/api'

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const username = (form.username as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;
    try {
      const response = await api.post(`/auth/signup`, { username: username, password: password });
      // Example: response.data contains user info or token
      if (response.data['success'] === true) {
        // Login successful
        // e.g. save token, redirect, show success message
        alert("Signup successful!");
        // window.location.href = "/dashboard";
      } else {
        // Login failed
       alert("Signup failed!");
      }
    } catch (error: unknown) {
      // Handle error (e.g. wrong credentials, server error)
      alert(error || "Signup error");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Sign up to ParamLogger</CardTitle>
        </CardHeader>
        <CardContent>
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
