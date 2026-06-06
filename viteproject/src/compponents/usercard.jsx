import React from 'react'

const usercard = (props) => {
  return (
    <div className='user-container'>
        <p id='user-title'>{props.name}</p>
        <img id='user-img' src="" alt="" />
        <p id='user-desc'>{props.desc}</p>
    </div>
  )
}

export default usercard