import { Playfair_Display, Rubik, Mrs_Saint_Delafield, Jost } from 'next/font/google';


export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Add other weights if needed
  display: 'swap',
});

export const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'], // choose weights you need
  display: 'swap',
});

export const mrsSaint = Mrs_Saint_Delafield({
  subsets: ['latin'],
  weight: ['400'], // Only one available
  display: 'swap',
});

export const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], // Add other weights if needed
  display: 'swap',
});