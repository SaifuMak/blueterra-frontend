// hooks/useIsMobile.js
import { useEffect, useState } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile); // Listen for resize

    return () => {
      window.removeEventListener('resize', checkMobile); // Cleanup
    };
  }, []);

  return isMobile;
}
