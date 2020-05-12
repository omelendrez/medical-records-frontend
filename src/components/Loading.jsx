import React from 'react'
import img from '../loading.gif'
import './Loading.css'

const Loading = () => {
  return (
    <div className="d-flex justify-content-center loading">
      <img src={img} alt='loading...' />
    </div>
  )
}

export default Loading