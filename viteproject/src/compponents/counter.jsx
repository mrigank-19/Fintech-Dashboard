import React, { useState, useEffect } from 'react'
import "./counter.css"

const counter = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)  // track loading state

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setLoading(false)   // done loading
      })
  }, [])

  if (loading) return <p>Loading...</p>   // shown while fetch is running

  return (
    <div>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
    </div>
  )
}

export default counter