// hooks/useIsTablet.js
import { useEffect, useState } from 'react';

export function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.innerWidth <= 1029);
    };

    checkTablet(); // Initial check
    window.addEventListener('resize', checkTablet); // Listen for resize

    return () => {
      window.removeEventListener('resize', checkTablet); // Cleanup
    };
  }, []);

  return isTablet;
}
