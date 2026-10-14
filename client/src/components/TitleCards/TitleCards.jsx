import React, { useEffect, useRef, useState } from 'react'
import "./TitleCards.css";
import cards_data from '../../assets/cards/Cards_data';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {

  const [apiData, setApiData] = useState([])
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjE2YmVjMDZiNzIxM2EzNDRmZDhhOTU3MmMwNTEyNSIsIm5iZiI6MTc5MTg3MTA1Mi45MzUwMDAyLCJzdWIiOiI2YWNkYzg0YzM4MzNlOTI5YWJlNzdhNDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.QbtYMJVk0Oqnqr0BeJ7vyESx23tFvRPNNwzFYTIJFKE'
    }
  };


  const handlewheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));


    cardsRef.current.addEventListener('wheel', handlewheel);
  }, [])


  return (
    <div className='title-cards'>
      <h2 >{title ? title : "Poppular on Netflix"} </h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
