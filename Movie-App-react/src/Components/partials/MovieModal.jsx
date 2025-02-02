import React, { useState } from 'react';

const MovieModal = ({ show, setShow, videoID }) => {
  return (
    <>
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className=" w-full max-w-4xl rounded-lg">
            <div className="relative">
              <iframe
                src={`https://vidsrc.xyz/embed/movie/${videoID}`}
                width="100%"
                height="500" // Adjust this as needed
                allow="autoplay"
                allowFullScreen
              />
              <button
                className="absolute top-2 right-2 text-white text-xl"
                onClick={() => setShow(false)}
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieModal;
