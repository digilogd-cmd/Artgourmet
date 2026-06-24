'use client';

import { useState, useEffect } from 'react';
import { useFreemiumStore } from '../../../store/useFreemiumStore';
import PaywallModal from '../../../components/PaywallModal';

export default function FindGoldenApp() {
  const [showPaywall, setShowPaywall] = useState(false);
  const [allowedAccess, setAllowedAccess] = useState(false);
  const { checkAndUse, isPremium } = useFreemiumStore();

  useEffect(() => {
    // 진입할 때 Freemium 체크
    const { allowed } = checkAndUse();
    if (!allowed && !isPremium) {
      setShowPaywall(true);
      setAllowedAccess(false);
    } else {
      setAllowedAccess(true);
    }
  }, [isPremium]);

  return (
    <main style={{ 
      width: '100%', 
      height: 'calc(100vh - 72px)', 
      backgroundColor: '#0c0c0c', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      {allowedAccess ? (
        <iframe 
          src="https://digilogd-cmd.github.io/findgolden/" 
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block'
          }}
          title="Find Golden Game"
        />
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '24px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--accent-dark-yellow)' }}>
            접근 제한됨
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            일일 무료 체험 횟수를 모두 소진하셨거나 권한이 없습니다. <br/>
            계속 플레이하려면 PRO 멤버십으로 업그레이드하세요.
          </p>
          <button 
            className="btn-primary" 
            onClick={() => setShowPaywall(true)}
            style={{ padding: '12px 36px' }}
          >
            멤버십 업그레이드
          </button>
        </div>
      )}

      <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} />
    </main>
  );
}
