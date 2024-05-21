import React from 'react'

const TicketTitle = ({Title = 'Ticket Title Here'} : {
    Title ?: String
}) => {
  return (
    <div className=' text-2xl '>
      {Title}
    </div>
  ) 
}

export default TicketTitle
