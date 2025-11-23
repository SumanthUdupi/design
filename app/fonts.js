import { Inter as GoogleInter, Fraunces as GoogleFraunces } from 'next/font/google';

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

const fonts = { inter, fraunces };

export { inter, fraunces };
export default fonts;
