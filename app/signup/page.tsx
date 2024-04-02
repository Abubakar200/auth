"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [btnDisable, setBtnDisable] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
        setBtnDisable(false)
    }
    else{
        setBtnDisable(true)
    }
  }, [user])
  const router = useRouter()
  const onSubmit =async () => {
        try {
            setLoading(true)
            await axios.post("/api/users/signup", user)
            toast.success("Registration successfully")
            router.push("/verifyemail")
        } catch (error: any) {
            toast.error("Error Occurred!", error)
        }finally{
            setLoading(false)
        }
  };
  return (
    <div className="h-full flex flex-col justify-center items-start ">
      <div className="mx-auto max-w-sm space-y-6  border border-gray-200 rounded-lg p-10 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">{loading? "Processing...": "SignUp"}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your information to create an account
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              placeholder="username"
              required
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="m@example.com"
              required
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              required
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <Button onClick={onSubmit} className="w-full" disabled={btnDisable}>
            Sign up
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link className="underline" href="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
