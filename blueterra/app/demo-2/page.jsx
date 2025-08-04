'use client'
import { useState } from 'react';

export default function FlipCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-64 h-40 perspective"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style preserve-3d ${flipped ? 'rotate-y-180' : ''}`}>
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-blue-500 text-white flex items-center justify-center rounded-lg shadow-lg">
          Front Side
        </div>
        {/* Back */}
        <div className="absolute w-full h-full backface-hidden bg-green-500 text-white flex items-center justify-center rounded-lg shadow-lg transform rotate-y-180">
          Back Side
        </div>
      </div>
    </div>
  );
}
