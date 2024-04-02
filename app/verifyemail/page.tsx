"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const verify = async () => {
    try {
      axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      toast.error("Error Occurred!", error.response.data);
    }
  };

  useEffect(() => {
    const url = window.location.search.split("=")[1];
    // const {query} = router
    // const url = query.token;
    setToken(url || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verify();
    }
  }, [token]);
  return (
    <div className="flex items-center justify-center w-full h-full py-2">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-4xl font-bold tracking-tighter">Verify Email</h2>
        <h2 className="text-lg font-bold bg-cyan-500 rounded-lg p-4 shadow-lg text-white">{token ? `${token}` : "Go to you email and click the click in the email for verified."}</h2>
        {verified && (
          <div>
            <h2 className="text-2xl font-bold tracking-tighter">Email Verified...</h2>
            <Link href={"/login"}>
                <Button variant={"secondary"} className="px-8 mt-2 font-bold">
                    Login
                </Button>
            </Link>
          </div>
        )}

        {error && (
          <div>
            <h2>Error</h2>
          
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
