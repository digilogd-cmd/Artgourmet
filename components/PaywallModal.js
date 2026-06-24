'use client';

export default function PaywallModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999
    }}>
      <div className="glass-panel" style={{
        width: '90%', maxWidth: '500px', padding: '40px',
        textAlign: 'center', position: 'relative'
      }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}
        >
          &times;
        </button>

        <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--accent-dark-yellow)' }}>
          Unlock Premium Access
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
          일일 무료 체험 횟수(3회)를 모두 소진하셨습니다. <br/>
          무제한 실행과 플러그인 연동을 위해 PRO 멤버십으로 업그레이드하세요.
        </p>

        <div style={{ padding: '24px', border: '1px solid var(--accent-neon-green)', borderRadius: '12px', marginBottom: '32px' }}>
          <h3 style={{ color: 'var(--accent-neon-green)', marginBottom: '8px' }}>PRO MEMBERSHIP</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>$9.99<span style={{ fontSize: '1rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>/mo</span></p>
        </div>

        <button className="btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '16px' }}>
          Upgrade with Stripe
        </button>
      </div>
    </div>
  );
}
