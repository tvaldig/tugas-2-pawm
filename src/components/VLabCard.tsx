"use client"

import Link from "next/link";
interface VlabCardProps {
  stateLogin: boolean;
}
export const VLabCard : React.FC<VlabCardProps> = ({stateLogin}) => {
  return (
      <>
      
    <div className=" border border-black lg:h-[350px] lg:w-[600px] h-[250px] w-[350px] rounded-lg shadow-lg p-5  m-auto text-center font-sans bg-white flex flex-col border-2 justify-center items-center">
      <h2 className="text-4xl font-spbutchlite font-bold text-gray-800 mb-2">Balance Equations</h2>
      <p className="text-gray-600 mb-5 font-spbutchlite font-bold">Try to balance between molecules & equations</p>
      <div className="justify-center text-left my-2"><Link
              href={stateLogin ? "/lab/experiment1" : "/login"}
              className="text-white  font-bold  font-spbutchlite transition transition-transform lg:text-[20px] duration-300 hover:scale-100 px-4 py-4 rounded-lg border border-[#729762] bg-[#000000] hover:bg-[#FFFFFF] hover:text-black shadow-md"
            >
              Play Now
            </Link></div>
    </div>
 
  </>
  );
};
