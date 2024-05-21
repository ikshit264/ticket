'use client'

import { ObjectId } from 'mongoose';
import React, { useEffect, useState } from 'react'

interface FormData {
  _id: ObjectId;
  title: string;
  description: string;
  priority: number;
  createdAt: Date; // Changed to string to handle ISO string from the server
  deadline: Date;
}

const page = ({params} : {
    params : {id : string}
}) => {
  const [Data, setData] = useState<FormData[]>([])

  useEffect(() => {
    const SearchID =async ()=>{
    const response = await fetch(`/api/ticket?id=${params.id}`)
    const data : FormData[] = await response.json();
    if (!data) {
      console.log('Data could obtained')
      return
    }
    setData(data)
    }
    SearchID()
  }, [])

  return (
    <div>
      {Data.title}
      <div>
        {Data.description}
      </div>
    </div>
  )
}

export default page
