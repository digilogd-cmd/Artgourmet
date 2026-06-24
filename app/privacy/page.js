'use client';

export default function PrivacyPolicy() {
  return (
    <main className="container" style={{ padding: '80px 24px', maxWidth: '800px' }}>
      <header style={{ marginBottom: '48px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '24px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
          <span className="text-glow-yellow">Privacy Policy</span>
        </h1>
        <p className="text-secondary" style={{ fontSize: '0.9rem' }}>최종 수정일: 2026년 6월 24일 / Last Updated: June 24, 2026</p>
      </header>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontSize: '0.9rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
        
        <div>
          <h2 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '12px' }}>1. 개인정보 수집 및 목적 / Collection of Personal Data</h2>
          <p>
            Art Gourmet는 이용자가 서비스를 이용할 때 필요한 최소한의 정보만 수집합니다. 당사는 가입 정보, 서비스 이용 로그, 쿠키(Cookie) 데이터를 수집하며, 수집된 데이터는 서비스 제공, 사용자 분석 및 서비스 개선 목적으로만 활용됩니다.
          </p>
          <p style={{ marginTop: '8px', color: 'var(--text-muted)' }}>
            Art Gourmet collects minimal data necessary to provide and improve our services. This includes service usage logs, cookies, and system data. All data is processed solely for optimization and service analysis.
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '12px' }}>2. 쿠키(Cookies) 및 구글 애드센스 / Cookies & Google AdSense</h2>
          <p>
            본 웹사이트는 사용자 경험 개선 및 맞춤형 광고 게재를 위해 쿠키를 사용합니다. 구글(Google)을 포함한 제3자 제공업체는 쿠키를 사용하여 본 사이트 또는 다른 사이트의 이전 방문을 기반으로 사용자에게 광고를 게재합니다.
          </p>
          <p>
            이용자는 구글의 <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-point)', textDecoration: 'underline' }}>광고 설정</a> 페이지를 방문하여 맞춤형 광고 게재를 거부할 수 있습니다.
          </p>
          <p style={{ marginTop: '8px', color: 'var(--text-muted)' }}>
            We use cookies to personalize content and ads, and to analyze traffic. Third-party vendors, including Google, use cookies to serve ads based on prior visits to our website. Users may opt out of personalized advertising by visiting Google Ads Settings.
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '12px' }}>3. 제3자 데이터 제공 및 보안 / Third-Party Disclosure & Data Security</h2>
          <p>
            법률적 요구가 있거나 불법 행위 대응 등 특별한 사유가 없는 한, 당사는 사용자의 개인정보를 외부 제3자에게 판매, 거래 또는 양도하지 않습니다. 수집된 모든 정보는 최신 클라우드 서버 보안 프로토콜 하에 안전하게 관리됩니다.
          </p>
          <p style={{ marginTop: '8px', color: 'var(--text-muted)' }}>
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties unless required by law. All data is secured under cutting-edge cloud server protocols.
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '12px' }}>4. 문의처 / Contact Information</h2>
          <p>
            개인정보처리방침에 관한 의문이나 건의사항이 있으실 경우 공식 메일로 연락해 주시기 바랍니다.
          </p>
          <p style={{ fontWeight: 'bold', color: '#fff', marginTop: '8px' }}>
            Email: artgourmet.official@gmail.com
          </p>
        </div>

      </section>
    </main>
  );
}
