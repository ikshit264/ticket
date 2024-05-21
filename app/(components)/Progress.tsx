import React from 'react'

const Progress = ({Progress = 75} : {
    Progress ?: number
}) => {
  return (
    <div>
      <div className= {`h-2 bg-black w-[${Progress}]`} ></div>
    </div>
  )
}

export default Progress
