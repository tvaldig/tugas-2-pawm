/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import RegisterCard from "@/components/RegisterCard";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Register = () => {
      const router = useRouter();
      const handleRegister = async (username: string, email: string, school: string,  password: string) => {
        try {
          const response = await fetch("https://server-orcin-two.vercel.app/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, school, password })
          });

          if (response.ok) {
            toast.success("Successfully Registered!");
            router.push('/login');
         
          } else {
            toast.error("Email has been registered!");
          }
        } catch {
          toast.error("Email has been registered!");
        }
      };
    return (
      <section className="min-h-screen h-[718px] bg-bg-2 flex flex-col items-left">
        <Toaster />
        <div className="px-[50px] py-10 h-16">
        <Link href="/" className="flex items-center">
          <img src="back.png" alt="back" className="lg:h-16 h-8" />
        </Link>
        <div className="flex flex-col justify-center items-center py-4">
            <RegisterCard onRegister={handleRegister}/>
        </div>
        </div>
        
        
      </section>
    );
  };
  
  export default Register;