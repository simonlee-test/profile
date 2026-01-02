import type { Metadata } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Neural Digital Garden | Portfolio',
  description: 'A high-performance, immersive personal portfolio website fusing biological nature with cybernetic infrastructure',
  keywords: ['portfolio', 'developer', '3D', 'Three.js', 'Next.js'],
  authors: [{ name: 'Simon Lee' }],
  openGraph: {
    title: 'Neural Digital Garden | Portfolio',
    description: 'A high-performance, immersive personal portfolio website',
    type: 'website'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} font-sans antialiased`}
        style={{
          backgroundColor: '#050505',
          color: '#FFFFFF'
        }}
      >
        {children}
      </body>
    </html>
  );
}
