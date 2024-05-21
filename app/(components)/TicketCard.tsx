'use client'
import React, { useEffect, useState } from 'react'
import Priority from './Prority'
import TicketTitle from './TicketTitle'
import TicketDescription from './TicketDescription'
import DateandTime from './DateandTime'
import { ObjectId } from 'mongoose'
import Link from 'next/link'

interface FormData {
  _id: ObjectId;
  title: string;
  description: string;
  priority: number;
  createdAt: Date; // Changed to string to handle ISO string from the server
  deadline: Date;
}

const TicketCard = () => {
  const [formData, setFormData] = useState<FormData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('api/ticket');
        const data: FormData[] = await response.json();
        const formattedData = data.map(ticket => ({
          ...ticket,
          createdAt: new Date(ticket.createdAt), // Convert ISO string to Date object
          deadline: new Date(ticket.deadline)
        }));
        setFormData(formattedData);
      } catch (error) {
        console.log('Error Fetching Data: ', error);
      }
    };
    fetchData();
  }, []);

  const HandleWebSocket = () => {

  }

  return (
    <div className='flex-col content-center'>
      <div className='flex flex-wrap justify-center'>
        {formData.map(ticket => (
          <div key={ticket._id} className='flex flex-col justify-center text-center m-2 p-2 border border-gray-400 rounded'>
            <div>
              <Priority priority={ticket.priority} />
            </div>
            <div>
              <TicketTitle Title={ticket.title} />
            </div>
            <div>
              <TicketDescription Description={ticket.description} />
            </div>
            <div>
              <DateandTime date={ticket.createdAt} />
            </div>
            <div>
              <span>Deadline: {ticket.deadline.toDateString()}</span>
            </div>
            <div className='flex justify-between mt-2'>
              {/* Use Link component to wrap each ticket item */}
              <Link href={`/ticket/${ticket._id}`}>
                <div className='px-4 py-2 bg-green-500 text-white rounded'>View Details</div>
              </Link>
              <button className='px-4 py-2 bg-red-500 text-white rounded'>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className='text-center p-4'>
        <button onClick={HandleWebSocket} className='p-2 w-fit border-2'>Start Socket</button>
      </div>
    </div>
  )
}

export default TicketCard