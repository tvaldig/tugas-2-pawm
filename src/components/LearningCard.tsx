import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Video {
  title: string;
  embedUrl: string;
}

interface Material {
  title: string;
  isMarkedAsRead: boolean;
  videos: Video[];
  _id: string;
}

interface LearningCardProps {
  progress: number;
  materials: Material[];
  userId: string;
  markMaterialAsRead: (userId: string, materialId: string, isRead: boolean) => Promise<void>;
}

const LearningCard: React.FC<LearningCardProps> = ({ progress, materials, markMaterialAsRead, userId }) => {
  const [selectedMaterialIndex, setSelectedMaterialIndex] = useState<number | null>(null);
  const [expandedVideoIndex, setExpandedVideoIndex] = useState<number | null>(null);

  const handleMaterialClick = (index: number) => {
    setSelectedMaterialIndex(index);
    setExpandedVideoIndex(null); // Reset video dropdown when selecting a new material
  };

  const toggleVideoDropdown = (videoIndex: number) => {
    setExpandedVideoIndex(expandedVideoIndex === videoIndex ? null : videoIndex);
  };

  const toggleMarkAsRead = async (index: number) => {
    const material = materials[index];
    const newIsMarkedAsRead = !material.isMarkedAsRead;

    // Immediately update the local state
    markMaterialAsRead(userId, material._id, newIsMarkedAsRead);

    // Optionally, you can perform any other local actions here.
  };

  return (
    <div className="text-left px-4 lg:px-0">
      {/* Course Progress Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mx-auto lg:mx-[100px] space-y-2 lg:space-y-0">
        <label className="text-gray-800 font-spbutchlite lg:text-[20px] text-[15px] font-bold">
          Course Progress
        </label>
        <p className="text-gray-600 mb-1 lg:text-[25px] text-[15px] font-bold font-spbutchlite">
          {progress}%
        </p>
        <div className="flex w-full relative lg:w-3/4 justify-left bg-gray-300 rounded-lg h-6 overflow-hidden">
          <div
            className="h-full rounded-lg transition-all duration-300 ease-in-out"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(to right, #1e3a8a, #3b82f6)`,
              position: "absolute",
            }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[718px] lg:gap-0 gap-4 bg-[#FAFAE0] p-4 rounded-lg border border-black border-2 lg:mx-[100px] mt-4 lg:mt-8">
        {/* Materials List */}
        <div className="w-full lg:w-1/4 h-48 lg:h-full overflow-y-auto bg-red-200 p-2 rounded-lg">
          {materials.map((material, index) => (
            <div
              key={index}
              onClick={() => handleMaterialClick(index)}
              className={`p-4 mb-2 bg-white rounded-lg text-black font-spbutchlite font-bold shadow-sm hover:shadow-md whitespace-normal text-[15px] transition-shadow duration-200 cursor-pointer ${
                selectedMaterialIndex === index ? "bg-gray-300" : ""
              }`}
            >
              <span>{material.title}</span>
            </div>
          ))}
        </div>

        {/* Material Details */}
        <div className="w-full lg:w-3/4 h-full pl-4 flex flex-col font-spbutchlite text-black">
          {selectedMaterialIndex !== null && (
            <>
              <div className="flex items-center justify-end mb-4">
                <label className="flex items-center cursor-pointer">
                  <span className="mr-2 font-bold font-spbutchlite text-black">Mark as Read</span>
                  <input
                    type="checkbox"
                    checked={materials[selectedMaterialIndex].isMarkedAsRead}
                    onChange={() => toggleMarkAsRead(selectedMaterialIndex)}
                    className="hidden"
                  />
                  <div
                    className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
                      materials[selectedMaterialIndex].isMarkedAsRead ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                        materials[selectedMaterialIndex].isMarkedAsRead ? "translate-x-4" : ""
                      }`}
                    ></div>
                  </div>
                </label>
              </div>

              {/* Video List */}
              <div className="flex flex-col space-y-2">
                {materials[selectedMaterialIndex].videos.map((video, index) => (
                  <div key={index} className="border border-gray-400 rounded-lg p-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">{video.title}</span>
                      <button onClick={() => toggleVideoDropdown(index)}>
                        {expandedVideoIndex === index ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </button>
                    </div>

                    {expandedVideoIndex === index && (
                      <div className="mt-2">
                        <iframe
                          src={video.embedUrl}
                          width="100%"
                          height="315"
                          className="rounded-lg"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningCard;
