import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div 
      className="h-screen flex flex-col justify-center items-center text-center relative"
      style={{
        backgroundImage: "url('/images/portada3.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 relative z-10 animate-fadeIn px-4">
        Descubre tu aroma favorito
      </h1>
      <p className="text-lg md:text-xl text-white relative z-10 animate-fadeIn delay-300 px-4">
        Explora nuestra colección de fragancias en tendencia
      </p>
    </div>
  );
};
