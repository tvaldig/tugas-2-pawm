"use client"

import { FC, useEffect, useState } from "react";
import { TextReveal } from "@/components/TextReveal";
import Link from 'next/link';
import { InfiniteSlider } from "@/components/InfiniteSlider";
import CanvasMolecules from "@/components/CanvasMolecules";
import { VLabCard } from "@/components/VLabCard";

const Home: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);  // Sets isLoggedIn to true if token exists
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[718px] w-full overflow-hidden tracking-wider text-black bg-bg-1">
        <div className="flex flex-col justify-center text-center my-20 gap-20">
          <TextReveal />
          <h1 className="font-spbutchlite font-bold lg:text-4xl text-2xl">Explore the world of fundamentals in Chemistry</h1>
        </div>
        
        <div className="justify-center text-center">
          <Link
            href={isLoggedIn ? "/subject/atoms" : "/login"}
            className="text-white font-bold font-spbutchlite transition-transform duration-300 hover:scale-100 px-4 py-4 rounded-lg border border-[#729762] bg-[#000000] hover:bg-[#FFFFFF] hover:text-black shadow-md hover:scale-110"
          >
            Try Now
          </Link>
        </div>
      </section>

      <section className="relative h-[418px] w-full overflow-hidden tracking-wider bg-white my-5 gap-2">
        <h1 className="font-superfunky font-bold lg:text-4xl text-2xl text-center text-red-300 my-8">
          Chemistry Subjects
        </h1>
        <InfiniteSlider />
      </section>

      <section className="relative lg:h-[718px] h-[818px] w-full overflow-hidden tracking-wider bg-bg-2">
        <h1 className="font-superfunky font-bold lg:text-4xl text-2xl text-center text-black [text-shadow:_5px_8px_10px_rgb(0_0_0_/_60%)] my-8">
          Explore Virtual Labs!
        </h1>
        <div className="flex lg:flex-row flex-col justify-center gap-4 lg:mx-[100px]">
          <CanvasMolecules />
          <VLabCard stateLogin={isLoggedIn}/>
        </div>
      </section>
    </div>
  );
};

export default Home;
