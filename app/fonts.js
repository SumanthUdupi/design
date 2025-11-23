import { Inter as GoogleInter, Fraunces as GoogleFraunces, Caveat as GoogleCaveat } from 'next/font/google';

const inter = GoogleInter({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = GoogleFraunces({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-fraunces',
  display: 'swap',
});

const caveat = GoogleCaveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-caveat',
  display: 'swap',
});

const fonts = { inter, fraunces, caveat };

export { inter, fraunces, caveat };
export default fonts;
