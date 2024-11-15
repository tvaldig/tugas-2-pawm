import React from 'react';

interface PopUpProps {
  openPopUp: boolean;
  closePopUp: () => void;
  content: string;
}

export const PopUp: React.FC<PopUpProps> = ({ openPopUp, closePopUp, content  }) => {
  const handleClosePopUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === 'ModelContainer') {
      closePopUp();
    }
  };

  if (!openPopUp) return null;

  return (
    <div
      id='ModelContainer'
      onClick={handleClosePopUp}
      className='fixed h-full w-full p-0 m-0 bg-black inset-0 bg-opacity-20 backdrop-blur-sm  flex justify-center items-center'
    >
      <div className='p-2 bg-white w-10/12 md:w-1/1.2 lg:w-0.1 h-1/2 h-shadow-inner border border-2 rounded-lg py-5'>
        <div className='w-full p-3 justify-center items-center'>
          <h2 className='font-bold  text-center text-3xl text-black font-spbutchlite'>Tutorial</h2>
          <p className='text-black text-m font-spbutchlite font-black'>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
