/* eslint-disable @next/next/no-img-element */
"use client";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";

interface UserProfile {
  username: string;
  email: string;
  school: string;
}

const Profile: FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      console.log(userId);
      if (!token || !userId) return;

      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUserProfile({
            username: data.username,
            email: data.email,
            school: data.school,
          });
        } else {
          console.error("Failed to fetch user profile with status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="min-h-screen bg-bg-2 flex items-left flex-col">
      <div className="px-[50px] py-10 h-16 flex flex-col">
        <Link href="/" className="flex items-center">
          <img src="back.png" alt="back" className="lg:h-16 h-8" />
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center my-8">
        {userProfile ? (
          <ProfileCard
            username={userProfile.username}
            email={userProfile.email}
            school={userProfile.school}
            progress={0}
          />
        ) : (
          <p className="font-bold font-spbutchlite text-3xl text-center text-black">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
