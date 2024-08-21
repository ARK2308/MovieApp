import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { asyncloadmovie } from '../store/actions/movieActions';

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
  })
 

  return (
    <div>
      <h1>Loading movie details...</h1>
    </div>
  );
};

export default MovieDetails;
