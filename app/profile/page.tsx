"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState("extra");

  const getUserDetails = async () => {
    try {
      const response = await axios.post("/api/users/me");
      setData(response.data.data._id);
    } catch (error: any) {
      toast.error("Error Occurred! To fetch the user detail", error);
    }
  };

  const logoutUser = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error("Error Occurred! To Logout the user", error);
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-full py-2">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-4xl font-bold tracking-tighter">Profile Page</h2>
        <h2>
          {data === "extra" ? (
            <span className="text-2xl font-bold tracking-tighter">
              Nothing to show
            </span>
          ) : (
            <Link href={`/profile/${data}`}><span className="text-lg font-bold">UserID: </span>{data}</Link>
          )}
        </h2>
        {/* <h1 className="text-2xl font-bold tracking-tighter">UserID</h1> */}
        <Button
        onClick={getUserDetails}
          size="sm"
          variant={"outline"}
          className="py-4"
        >
          Get User details
        </Button>
        <Button
          onClick={logoutUser}
          size="sm"
          variant={"destructive"}
          className="py-4"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
