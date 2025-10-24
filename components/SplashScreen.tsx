import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  isVisible: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ isVisible }) => {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const appName = "Cafégardee";

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    } else {
      // Wait for the fade-out animation to finish before unmounting
      const timer = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-stone-950 transition-opacity duration-500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      aria-hidden={!isVisible}
    >
      <h1 className="font-display text-5xl md:text-7xl text-white tracking-wider" aria-label={appName}>
        {appName.split('').map((char, index) => (
          <span 
            key={index} 
            className="animate-fade-in-up opacity-0" 
            style={{ animationDelay: `${100 + index * 100}ms`, willChange: 'transform, opacity' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
      
      <style>
        {`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s forwards ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default SplashScreen;
