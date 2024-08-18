import React from 'react';
import { Link } from 'react-router-dom';

const Cards = ({ data }) => {
  return (
    <div className='flex flex-wrap w-full h-full justify-center'>
      {data.map((c, i) => (
        <Link 
          className='card w-[35vh] mx-[2%] shadow-2xl mb-[1%] mt-[5%] justify-center rounded-lg' 
          key={i}>
          <div className='relative'>
            <img 
              className='card-image h-[40vh] w-full object-cover rounded-lg opacity-75' 
              src={`https://image.tmdb.org/t/p/original/${c.poster_path || c.backdrop_path}`} 
              alt={c.name || c.title || c.original_name || c.original_title} 
            />
            {/* Overlay title on the image */}
            <h1 className='card-overlay-title absolute bottom-0 left-0 right-0 text-white font-semibold text-2xl bg-black bg-opacity-60 p-2 text-center'>
              {c.name || c.title || c.original_name || c.original_title}
            </h1>
          </div>
          
          {/* Title, Industry, and Duration below the card */}
          <div className='text-white text-center mt-2'>
            <h2 className='text-lg font-bold'>
              {c.name || c.title || c.original_name || c.original_title}
            </h2>
            <p className='text-sm'>
              {c.original_language === 'hi' ? 'Bollywood' : 'Hollywood'}
            </p>
            <p className='text-sm'>
              {Math.floor(c.runtime / 60)}h {c.runtime % 60}m
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
