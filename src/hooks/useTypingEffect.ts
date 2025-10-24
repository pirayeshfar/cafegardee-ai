import { useState, useEffect } from 'react';

/**
 * A custom hook to simulate a typing effect for a given string.
 * @param fullText The text to display with a typing effect.
 * @param speed The delay in milliseconds between each character. If 0, text appears instantly.
 * @returns The progressively revealed text.
 */
export const useTypingEffect = (fullText: string, speed: number = 30): string => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    // If speed is 0 or no text, display immediately without effect
    if (speed === 0 || !fullText) {
      setDisplayedText(fullText || '');
      return;
    }
    
    // Reset text when a new fullText is provided
    setDisplayedText('');
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(prev => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, speed);

    // Cleanup on component unmount or when dependencies change
    return () => clearInterval(intervalId);
  }, [fullText, speed]);

  return displayedText;
};