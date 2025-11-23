import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ThemeProvider from '../components/ThemeProvider';
import AchievementProvider from '../components/AchievementProvider';
import EasterEggs from '../components/EasterEggs';
import { inter, fraunces, caveat } from './fonts';

export const metadata = {
  title: 'Design Portfolio',
  description: 'Sophisticated portfolio with thoughtful interactions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${caveat.variable}`}>
      <body>
        <ThemeProvider>
          <AchievementProvider>
            <EasterEggs />
            <Header />
            <main className="container">{children}</main>
            <Footer />
          </AchievementProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
