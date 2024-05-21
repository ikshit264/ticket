import React from 'react'

interface DateAndTimeProps {
  date: Date;
}

const DateandTime: React.FC<DateAndTimeProps> = ({ date }) => {
  const formattedDate = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  const time = date.toTimeString().split(' ')[0]; // Format as HH:MM:SS

  return (
    <div className='flex justify-evenly'>
      <div className='date'>{formattedDate}</div>
      <div className='time'>{time}</div>
    </div>
  )
}

export default DateandTime
