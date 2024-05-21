'use client'

import React, { MouseEvent, useState } from 'react';

const ClickTracker: React.FC = () => {
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);

  // Function to handle button and document clicks
  const handleClick = (action: 'open' | 'close') => (event: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent the click event from propagating if necessary

    if (action === 'open') {
      setIsButtonClicked(true);
    } else {
      setIsButtonClicked(false);
    }
  };

  return (
    <div onClick={handleClick('close')} className='absolute w-full' style={{ height: '100vh' }}>
      <button onClick={handleClick('open')} style={{ margin: '20px' }}>
        Click Me
      </button>
      <p>The button has been {isButtonClicked ? 'clicked' : 'not clicked'}.</p>
    </div>
  );
};

export default ClickTracker;
