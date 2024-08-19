import React from 'react';
import { Link } from 'react-router-dom';

const Cards = ({ data , title }) => {
  console.log(title);
  return (
    <div className='flex flex-wrap w-full h-full justify-center'>
      {data.map((c, i) => (
        <Link 
        to = {`/${c.media_type || title }/details/${c.id}`}
          className='card w-[35vh] mx-[2%] shadow-2xl mb-[1%] mt-[5%] justify-center rounded-lg' 
          key={i}>
          <div className='relative'>
            <img 
              className='card-image h-[40vh] w-full object-cover rounded-lg opacity-100' 
              src={`https://image.tmdb.org/t/p/original/${c.poster_path || c.backdrop_path || c.profile_path}`}  
              
            />
            {/* Overlay title on the image */}
            {/* <h1 className='card-overlay-title absolute bottom-0 left-0 right-0 text-white font-semibold text-2xl bg-black bg-opacity-60 p-2 text-center'>
              {c.name || c.title || c.original_name || c.original_title}
            </h1> */}
          </div>
          
          {/* Title, Industry, and Duration below the card */}
          <div className='text-white text-center mt-2'>
            <h2 className='text-lg font-bold'>
              {c.name || c.title || c.original_name || c.original_title}
            </h2>
            <p className='text-sm'>
              {c.original_language === 'hi' ? 'Bollywood' : 'Hollywood'}
            </p>
        
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
