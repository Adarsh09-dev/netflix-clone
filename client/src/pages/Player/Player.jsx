import React, { useEffect, useState } from 'react'
import "./Player.css"
import balck_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();



  const [apiData, setApiData] = useState
    ({
      name: "",
      key: "",
      published_at: "",
      typeof: ""
    })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjE2YmVjMDZiNzIxM2EzNDRmZDhhOTU3MmMwNTEyNSIsIm5iZiI6MTc5MTg3MTA1Mi45MzUwMDAyLCJzdWIiOiI2YWNkYzg0YzM4MzNlOTI5YWJlNzdhNDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.QbtYMJVk0Oqnqr0BeJ7vyESx23tFvRPNNwzFYTIJFKE'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err));
  },[])





  return (
    <div className='player'>
      <img src={balck_arrow_icon} alt="" onClick={() => { navigate(-2) }} />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="YouTube trailer"
        allowFullScreen
        frameboarder="0"
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>

    </div>
  )
}

export default Player
