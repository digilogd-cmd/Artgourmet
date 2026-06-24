'use client';

import { useFreemiumStore } from '../../store/useFreemiumStore';

export default function Settings() {
  const { isPremium, dailyUses, maxFreeUses, lastUseDate } = useFreemiumStore();

  return (
    <main className="container" style={{ padding: '64px 24px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '48px' }}>
        <span className="text-glow-yellow">Settings & Billing</span>
      </h1>

      <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Membership Status</h2>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ 
            width: '12px', height: '12px', borderRadius: '50%', 
            backgroundColor: isPremium ? 'var(--accent-neon-green)' : '#ffae42',
            boxShadow: isPremium ? '0 0 10px var(--accent-neon-green)' : 'none'
          }} />
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            {isPremium ? 'PRO Member (Unlimited)' : 'Free Tier'}
          </span>
        </div>

        {!isPremium && (
          <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
            <p style={{ marginBottom: '8px' }}>Today's Usage ({lastUseDate}):</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ flexGrow: 1, height: '8px', backgroundColor: '#333', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${(dailyUses / maxFreeUses) * 100}%`, 
                  height: '100%', 
                  backgroundColor: 'var(--accent-dark-yellow)',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <span>{dailyUses} / {maxFreeUses} Uses</span>
            </div>
          </div>
        )}

        {!isPremium && (
          <button className="btn-primary" style={{ marginTop: '24px', width: '100%' }}>
            Upgrade to PRO (Stripe Checkout)
          </button>
        )}
      </div>
    </main>
  );
}
