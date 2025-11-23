import PropTypes from 'prop-types';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ThemeProvider from '../components/ThemeProvider';
import AchievementProvider from '../components/AchievementProvider';
import { inter, fraunces } from './fonts';

export const metadata = {
  title: 'Design Portfolio',
  description: 'Sophisticated portfolio with thoughtful interactions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <ThemeProvider>
          <AchievementProvider>
            <Header />
            <main className="container">{children}</main>
            <Footer />
          </AchievementProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};
