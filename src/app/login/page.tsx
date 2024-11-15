/* eslint-disable @next/next/no-img-element */
"use client";
import { FC } from "react";
import Link from "next/link";
import LoginCard from "@/components/LoginCard";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
const Login: FC = () => {
  const router = useRouter();
  const handleLogin = async (email: string,password: string) => {
    try {
      const response = await fetch("https://server-i2k01wfod-tvaldigs-projects.vercel.app/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password })
      });
      const data = await response.json();
      if (response.ok && data.sessionToken) {
        toast.success("Login Success!");
        localStorage.setItem("token", data.sessionToken);
        localStorage.setItem("userId", data.userId);
        router.push('/');
     
      } 
    } catch {
      toast.error("Wrong Email or Password!");
    }
  }
    return (
      <div className="min-h-screen bg-bg-2 flex items-left flex-col">
        <Toaster />
        <div className="px-[50px] py-10 h-16 flex flex-col">
        <Link href="/" className="flex items-center">
          <img src="back.png" alt="back" className="lg:h-16 h-8" />
        </Link>
        <div className="flex flex-col justify-center items-center my-8">
            <LoginCard onLogin={handleLogin}/>
        </div>
        </div>
        
        
      </div>
    );
  };
  
  export default Login;