import PropTypes from 'prop-types';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ThemeProvider from '../components/ThemeProvider';
import AchievementProvider from '../components/AchievementProvider';
import { inter, fraunces, caveat } from './fonts';

export const metadata = {
  title: 'Design Portfolio | Thoughtful Digital Experiences',
  description: 'A sophisticated, whimsical portfolio exploring the intersection of art and code.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${caveat.variable}`}>
      <body>
        <ThemeProvider>
          <AchievementProvider>
            <div className="layout-wrapper">
              <Header />
              <main className="main-content">{children}</main>
              <Footer />
            </div>
          </AchievementProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};
