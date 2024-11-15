import React from 'react';

interface PopUpProps {
  openPopUpAnswer: boolean;
  closePopUpAnswer: () => void;
  content: string;
  status: boolean;
}

export const PopUpAnswer: React.FC<PopUpProps> = ({ openPopUpAnswer, closePopUpAnswer, content, status }) => {
  const handleClosePopUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === 'ModelContainer') {
      closePopUpAnswer();
    }
  };

  if (!openPopUpAnswer) return null;

  return (
    <div
      id='ModelContainer'
      onClick={handleClosePopUp}
      className='fixed h-full w-full p-0 m-0 bg-black inset-0 bg-opacity-20 backdrop-blur-sm  flex justify-center items-center'
    >
      <div className='p-2 bg-white w-10/12 md:w-1/1.2 lg:w-0.1 h-1/2 h-shadow-inner border border-2 rounded-lg py-5'>
        <div className='w-full p-3 justify-center items-center'>
          <h2 className={`font-bold  text-center text-4xl font-spbutchlite ${status ? ("text-[#0FBC00]") : "text-[#D72F2F]"}`}>{status ? ("CORRECT") : "WRONG"}</h2>
          <p className='text-black text-m font-bold font-spbutchlite'>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default PopUpAnswer;
