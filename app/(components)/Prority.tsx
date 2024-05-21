import React from 'react';
import { FaFire } from 'react-icons/fa';

const Priority = ({ priority = 5 }: { priority?: number }) => {
  const fireIcons = [];

  priority = Math.min(5, priority);

  for (let i = 0; i < priority; i++) {
    fireIcons.push(<div key={i}> <FaFire color="red" size={20} /> </div>);
  }

  return <div className='flex justify-center'>{fireIcons}</div>;
};

export default Priority;
