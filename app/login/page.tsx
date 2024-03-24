"use client"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [btnDisable, setBtnDisable] = useState(false)
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setBtnDisable(false);
    }else{
      setBtnDisable(true);
    }
  }, [user])
  const onSubmit =async () => {
    try {
      setLoading(true)
      await axios.post("/api/users/login", user)
      toast.success("Login successfully")
      router.push("/profile")
    } catch (error:any) {
      toast.error("Error Occurred!", error)
      
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="h-full flex flex-col justify-center items-start ">
      <div className="mx-auto max-w-[350px] border p-8 rounded-lg space-y-6 shadow">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">{loading? "Processing...": "Login"}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your credentials to access your account
          </p>
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
        <Button onClick={onSubmit} className="w-full" disabled={btnDisable}>Login</Button>
        <div className="flex items-center space-x-1.5 text-sm">
          <span>Don't have an account?</span>
          <Link className="underline" href="/signup">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
