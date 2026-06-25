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
          background: 'rgba(0, 0, 0, 0.8)', 
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
            <a href="https://blog.artgourmet.cloud" target="_blank" rel="noopener noreferrer">Team Blog</a>
            <Link href="/settings">Settings</Link>
          </div>
        </nav>
        <div style={{ marginTop: '72px', minHeight: 'calc(100vh - 72px - 140px)' }}>
          {children}
        </div>
        <footer style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '40px 24px',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          background: 'var(--bg-surface)'
        }}>
          <div className="container" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center'
          }}>
            <p style={{ letterSpacing: '0.05em' }}>
              &copy; {new Date().getFullYear()} ArtGourmet. All rights reserved.
            </p>
            <p>
              Contact: <a href="mailto:artgourmet.official@gmail.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>artgourmet.official@gmail.com</a>
            </p>
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', marginTop: '4px' }}>
              <Link href="/privacy" className="footer-link">Privacy Policy</Link>
              <span style={{ color: 'var(--border-subtle)' }}>|</span>
              <Link href="/terms" className="footer-link">Terms of Service</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
