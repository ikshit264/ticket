'use client'

import React, { useState } from 'react';

const TicketDescription = ({ Description = 'Your Ticket Description Here' }: {
  Description?: String
}) => {
  const [Expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!Expanded);
  }
  const RevisedDescription = Description.length > 100 ? Description.slice(0, 100) : Description;

  return (
    <>
      <div className={`text-center break-words max-h-40 max-w-[60rem] custom-scrollbar ${Expanded ? 'overflow-y-scroll' : ''}`} style={{ scrollbarWidth: 'thin', scrollbarColor: '#888888 transparent' }}>
        {Expanded ? Description : RevisedDescription}
        {
          Description.length > 100 && (
            <span>
              <span className='block text-blue-500 cursor-pointer' onClick={toggleExpanded}>
                {Expanded ? '...Read Less' : '...Read More'}
              </span>
            </span>
          )
        }
      </div>

    </>
  )
}

export default TicketDescription;
