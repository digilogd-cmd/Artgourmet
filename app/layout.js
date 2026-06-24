import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Art Gourmet | Antigravity',
  description: 'Antigravity Premium IT Flagship Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <nav style={{ 
          position: 'fixed', 
          top: 0, 
          width: '100%', 
          padding: '16px 24px', 
          background: 'rgba(17, 17, 17, 0.8)', 
          backdropFilter: 'blur(16px)', 
          borderBottom: '1px solid var(--border-subtle)',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>
            <Link href="/" className="text-glow-yellow" style={{ textDecoration: 'none' }}>
              Art Gourmet
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '24px', fontWeight: '500' }}>
            <Link href="/">Showcase</Link>
            <Link href="/blog">Team Blog</Link>
            <Link href="/settings">Settings</Link>
          </div>
        </nav>
        <div style={{ marginTop: '72px' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
