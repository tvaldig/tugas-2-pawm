"use client";

import LearningCard from "@/components/LearningCard";
import { FC, useEffect, useState } from "react";

const Atoms: FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [materials, setMaterials] = useState([
    {
      title: "Atom Model & Valency",
      isMarkedAsRead: false,
      videos: [
        { title: "Rutherford's Atomic Model", embedUrl: "https://youtu.be/embed/1EdTw4I6L0U?si=Nf42-UgH_HKvvN5n" },
        { title: "Concept of Valency", embedUrl: "https://youtu.be/embed/1EdTw4I6L0U?si=Nf42-UgH_HKvvN5n" },
      
      ],
      _id: "1",
    },
    {
      title: "Concept of Mole",
      isMarkedAsRead: false,
      videos: [
        { title: "Concept of Mole Part 1", embedUrl: "https://youtu.be/embed/4q2elWPfB6A?si=h8y-Zxp_MXv3mPYG" },
        { title: "Avogadro's Number", embedUrl: "https://youtu.be/embed/4q2elWPfB6A?si=y5IG0zgs0_xPvKRT" },
      ],
      _id: "2",
    },
    {
      title: "Atomic Mass & Model",
      isMarkedAsRead: false,
      videos: [
        { title: "What is Atomic Mass?", embedUrl: "https://youtu.be/embed/8NuSzMIsir0?si=jBEXSTNmFZ3frTK4" },
        { title: "Rutherford's Atomic Model Part 2", embedUrl: "https://youtu.be/embed/B-k_kMwB1zM?si=MgBv5upm0kBHuQG3" },
        { title: "Bohr's Atomic Model", embedUrl: "https://youtu.be/embed/S1LDJUu4nko?si=pLuvoG9RWyAq1_nJ" },
      ],
      _id: "3",
    },
    {
      title: "Atom Numbers, Mass, Isotopes",
      isMarkedAsRead: false,
      videos: [
        { title: "Atomic Number", embedUrl: "https://www.youtube.com/embed/D3GR6thtApI?si=DV0MpdCRg9DoOy-l" },
        { title: "Measuring Atomic Mass", embedUrl: "https://www.youtube.com/embed/KuyB-445gQM?si=D3M3wHZySdEGa0XE" },
        { title: "Isotopes & Isobars", embedUrl: "https://www.youtube.com/embed/qgJW1g0nCxQ?si=Al2wmwEM8iSHd17o" },
      ],
      _id: "4",
    },
    {
      title: "Atom History & Law",
      isMarkedAsRead: false,
      videos: [
        { title: "History of Atoms", embedUrl: "https://www.youtube.com/embed/3z-f63MiPB4?si=Xft7YfKDYtibvBP4" },
        { title: "Law of Conservation of Mass", embedUrl: "https://www.youtube.com/embed/i2OE9ljBKD8?si=7zf5YdO-lBpqA1Rq" },
        { title: "Law of Constant Proportion", embedUrl: "https://www.youtube.com/embed/08-96_wkUi8?si=LYSHe8LxPGKOhbbZ" },
      ],
      _id: "5",
    },
  ]);
  
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
  
      const fetchProgress = async (userId: string) => {
        try {
          const response = await fetch(`https://server-orcin-two.vercel.app/${userId}/progress`);
          const data = await response.json();
  
          // Update materials based on backend data
          if (data.materials) {
            setMaterials(prevMaterials =>
              prevMaterials.map(material => ({
                ...material,
                isMarkedAsRead: data.materials.includes(material._id)
              }))
            );
          }
  
          // Calculate initial progress based on marked materials
          const completedCount = data.materials ? data.materials.length : 0;
          const progressPercentage = (completedCount / materials.length) * 100;
          setProgress(progressPercentage);
        } catch (error) {
          console.error("Error fetching progress:", error);
          // Set progress to 0 if fetch fails
          setProgress(0);
        }
      };
  
      fetchProgress(storedUserId);
    }
  }, [materials]); // Add materials as a dependency because it's used in fetchProgress
  

  const calculateProgress = (updatedMaterials: typeof materials) => {
    const completedCount = updatedMaterials.filter(material => material.isMarkedAsRead).length;
    return (completedCount / updatedMaterials.length) * 100;
  };

  const markMaterialAsRead = async (userId: string, materialId: string, isRead: boolean) => {
    try {
      const token = localStorage.getItem("token");
      // Make API call to update backend
      await fetch("https://server-orcin-two.vercel.app/mark-as-read", {
        method: "POST",
        headers: { "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ userId, materialId, isRead }),
      });

      // Update local state only after successful API call
      const updatedMaterials = materials.map(material =>
        material._id === materialId ? { ...material, isMarkedAsRead: isRead } : material
      );
      
      setMaterials(updatedMaterials);
      
      // Calculate and update progress based on updated materials
      const newProgress = calculateProgress(updatedMaterials);
      setProgress(newProgress);
    } catch (error) {
      console.error("Error marking material as read:", error);
      // Optionally show error message to user
    }
  };

  return (
    <div className="min-h-screen bg-bg-2 pb-16">
      <h1 className="font-superfunky font-bold [text-shadow:_5px_8px_10px_rgb(0_0_0_/_60%)] lg:text-4xl text-2xl text-center py-12 text-black text-pretty">
        Atoms & Molecules
      </h1>
      <LearningCard
        progress={progress}
        materials={materials}
        userId={userId}
        markMaterialAsRead={markMaterialAsRead}
      />
    </div>
  );
};

export default Atoms;