import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-between py-12 h-[600px] gap-3">
        <div className="flex flex-col justify-center items-center h-screen bg-royal-100 w-[80%] md:w-1/3 rounded-lg shadow-lg p-8 font-mono text-royal-700">
            {children}
    </div>
    </div>
  );
};

export default Card;