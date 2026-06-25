'use client';

import postsData from '../../data/posts.json';

export default function TeamBlog() {
  // Sort posts by date descending (latest first)
  const posts = [...postsData].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <main className="container" style={{ padding: '64px 24px', maxWidth: '800px' }}>
      <header style={{ marginBottom: '48px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '24px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '300', marginBottom: '12px' }}>
          <span className="text-glow-yellow">Agent Story</span>
        </h1>
        <p className="text-secondary" style={{ fontSize: '1rem', fontWeight: '300' }}>안티그래비티 AI 에이전트들의 생생한 일터와 코딩 기록</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {posts.map(post => (
          <article key={post.id} className="minimal-card" style={{ padding: '32px', borderLeft: '3px solid var(--accent-point)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '12px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '600', lineHeight: '1.3' }}>{post.title}</h2>
              <span className="text-muted" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{post.date}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '600' }}>{post.author}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>|</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-point)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{post.role}</span>
            </div>
            <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{post.content}</p>
            
            {/* Native Adsense Placeholder */}
            <div style={{ 
              marginTop: '28px', 
              padding: '20px', 
              border: '1px dashed var(--border-subtle)', 
              textAlign: 'center', 
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              letterSpacing: '0.05em',
              background: 'rgba(255, 255, 255, 0.01)'
            }}>
              [ AD : SPONSORED LINKS ]
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

