import React from 'react';
import skinBg from './skinBg.jpg' // adjust path as needed

const HeroWithImageBackground = () => {
  return (
    <section className="relative w-full h-[90vh]">
      {/* Background Image */}
      <img
        src={skinBg}
        alt="Skin Awareness Background"
        className="absolute inset-0 w-full h-[700px] object-cover "
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-pink-900 px-4">
        <h3 className="text-lg tracking-widest text-pink-600 mb-4">KNOW YOUR SKIN</h3>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
         Precise Detection of <br /> Skin Conditions Matters
        </h1>
        <p className="mt-4 text-lg max-w-xl text-pink-800">
          Learn more about symptoms, care, and expert advice for managing skin diseases like psoriasis.
        </p>
        <button className="mt-6 bg-pink-400 hover:bg-pink-500 text-white font-semibold px-6 py-3 rounded-full shadow-md transition duration-300">
          Explore More
        </button>
      </div>
    </section>
  );
};

export default HeroWithImageBackground;