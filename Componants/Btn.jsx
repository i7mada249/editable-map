import React from 'react'
import "../src/App.css"
import MarkersPage from '../src/MarkerControl'
import { useNavigate } from 'react-router-dom';



const EditMarkers = () => {
    const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/edit-markers")} className='main-btn'>Edit Markers</div>
  )
}

export default EditMarkers