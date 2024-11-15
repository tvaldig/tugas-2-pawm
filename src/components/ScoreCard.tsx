import { FC } from "react";

interface ScorecardProps {
  score: number;
}

const ScoreCard: FC<ScorecardProps> = ({ score }) => {
  return (
    <div className="border border-black font-spbutchlite font-bold lg:w-[250px] border-2 lg:h-[56px]  w-[200px] h-[55px] rounded-lg shadow-lg p-5 bg-white flex items-center justify-left lg:text-l text-m font-bold">
      <span className="text-pretty text-black text-left">Score: </span>
      <span className="ml-2 text-black">{score}</span>
    </div>
  );
};

export default ScoreCard;
