'use client';

export default function TermsOfService() {
  return (
    <main className="container" style={{ padding: '80px 24px', maxWidth: '800px' }}>
      <header style={{ marginBottom: '48px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '24px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
          <span className="text-glow-yellow">Terms of Service</span>
        </h1>
        <p className="text-secondary" style={{ fontSize: '0.9rem' }}>최종 수정일: 2026년 6월 24일 / Last Updated: June 24, 2026</p>
      </header>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontSize: '0.9rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
        
        <div>
          <h2 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '12px' }}>1. 약관의 동의 / Acceptance of Terms</h2>
          <p>
            본 웹사이트(Art Gourmet)를 방문하거나 당사의 서비스를 이용하는 것은 귀하가 본 이용약관에 동의하고 이를 준수할 것을 약속한 것으로 간주됩니다. 만약 본 약관의 내용에 동의하지 않으실 경우, 서비스 이용이 제한될 수 있습니다.
          </p>
          <p style={{ marginTop: '8px', color: 'var(--text-muted)' }}>
            By accessing or using the Art Gourmet website and services, you agree to be bound by these Terms of Service. If you do not agree, please discontinue using our platform.
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '12px' }}>2. 서비스 제공 및 사용 목적 / Description & Use of Service</h2>
          <p>
            Art Gourmet는 1인의 인간 디렉터와 AI 크루들의 상호 작용 및 개발 서비스를 서빙하는 프리미엄 IT 플랫폼입니다. 이용자는 본 플랫폼을 합법적인 목적 및 약관에 위배되지 않는 선에서 자유롭게 이용하실 수 있습니다.
          </p>
          <p style={{ marginTop: '8px', color: 'var(--text-muted)' }}>
            Art Gourmet is a premium IT platform serving interactive AI agent utilities. Users are granted a limited license to access the site and its contents for personal and non-commercial purposes.
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '12px' }}>3. 책임 한계 / Limitation of Liability</h2>
          <p>
            당사의 서비스 및 에이전트 정보는 '있는 그대로(AS IS)' 제공됩니다. Art Gourmet는 서비스 제공 지연, 시스템 일시 장애 또는 에이전트의 출력 결과물 등으로 인한 임의적 데이터 손실에 대해 법적으로 책임지지 않습니다.
          </p>
          <p style={{ marginTop: '8px', color: 'var(--text-muted)' }}>
            Our services and information are provided on an "as is" and "as available" basis. Art Gourmet shall not be liable for any damages resulting from server downtime, data losses, or agent output flaws.
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '12px' }}>4. 이용자 의무 / User Obligations</h2>
          <p>
            이용자는 당사의 소스 코드 리버스 엔지니어링, 허가받지 않은 스크래핑, 또는 플랫폼 성능에 심각한 부하를 가하는 일체의 해킹 행위를 시도해선 안 됩니다.
          </p>
          <p style={{ marginTop: '8px', color: 'var(--text-muted)' }}>
            Users must not attempt to reverse engineer, scrap unauthorized contents, or launch hacking attempts that impair platform stability.
          </p>
        </div>

      </section>
    </main>
  );
}
