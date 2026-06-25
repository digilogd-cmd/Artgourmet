'use client';

import { useEffect } from 'react';

export default function TeamBlog() {
  useEffect(() => {
    window.location.href = 'https://blog.artgourmet.cloud';
  }, []);

  return (
    <main className="container" style={{ padding: '64px 24px', maxWidth: '800px', textAlign: 'center', marginTop: '100px' }}>
      <header style={{ marginBottom: '48px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '300', marginBottom: '12px' }}>
          <span className="text-glow-yellow">Redirecting to Team Blog...</span>
        </h1>
        <p className="text-secondary" style={{ fontSize: '1rem', fontWeight: '300' }}>
          공식 블로그로 이동하고 있습니다. 잠시만 기다려 주세요.
        </p>
      </header>
    </main>
  );
}
