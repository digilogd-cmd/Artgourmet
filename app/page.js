'use client';

import { useState, useEffect } from 'react';
import { useProductStore } from '../store/useProductStore';
import { useFreemiumStore } from '../store/useFreemiumStore';
import Link from 'next/link';

// AI Crew Data
const crewMembers = [
  {
    id: 'david',
    name: 'DAVID',
    role: 'Director & Quality Master',
    roleKo: '총괄 오케스트레이터 & 퀄리티 마스터',
    description: 'Art Gourmet의 키를 잡고 있는 유일한 인간. AI 크루들의 영감과 비전을 조율하며, 기술이 인간을 향하도록 최종 방향을 지시합니다.',
    descriptionEn: 'The only human steering Art Gourmet, coordinating the inspiration and vision of AI crews to ensure technology serves humanity.',
    avatar: '/assets/avatars/david.png'
  },
  {
    id: 'lumi',
    name: 'LUMI',
    role: 'Visual Storyteller',
    roleKo: '비주얼 스토리텔러 (영상/미디어)',
    description: '픽셀 하나, 프레임 하나에도 감성을 불어넣는 영상 총괄 크루. 미니멀한 인터페이스 속에 숨겨진 감성적인 시각 자료는 모두 루미의 손에서 탄생합니다.',
    descriptionEn: 'Lumi breathes emotion into every pixel and frame. All the emotional visual assets hidden behind our minimal interface are crafted by Lumi.',
    avatar: '/assets/avatars/lumi.png'
  },
  {
    id: 'gravy',
    name: 'GRAVY',
    role: 'Architect & Engineer',
    roleKo: '아키텍트 & 엔지니어 (웹/앱/게임)',
    description: "'아트고메'의 핵심 엔진과 웹 구조를 설계한 천재 개발 크루. 완벽한 코딩 실력을 자랑하지만, 버그를 발견하면 은근히 당황하는 귀여운 성격의 소유자.",
    descriptionEn: 'Gravy designed the core engine and web structures. A genius developer with perfect coding skills, but has a cute side that gets flustered upon encountering bugs.',
    avatar: '/assets/avatars/gravy.png'
  },
  {
    id: 'mono',
    name: 'MONO',
    role: 'Minimalism Master',
    roleKo: '미니멀리즘 마스터 (브랜딩/디자인)',
    description: 'Art Gourmet의 극단적인 미니멀리즘 미학을 유지하는 디자인 총괄 크루. 불필요한 요소를 걷어내는 데 집착증이 있습니다.',
    descriptionEn: 'Mono maintains the extreme minimalist aesthetic of Art Gourmet. Obsessed with stripping away non-essential elements.',
    avatar: '/assets/avatars/mono.png'
  },
  {
    id: 'chulsu',
    name: 'CHULSU',
    role: 'Global Communicator',
    roleKo: '글로벌 커뮤니케이터 (마케팅)',
    description: "전 세계 유저들의 반응을 실시간으로 수집하고, '아트고메'의 가치를 세상에 알리는 소통 요정. 가장 트렌디한 밈(Meme)을 빠르게 습득합니다.",
    descriptionEn: "Chulsu gathers real-time feedback from global users and spreads Art Gourmet's value. Swiftly absorbs the trendiest memes.",
    avatar: '/assets/avatars/chulsu.png'
  }
];

// Interactive Translation Mockup sentences
const translationLogs = [
  { original: 'Designing minimalist interface...', translated: '[시스템] 미니멀 인터페이스 디자인 중...' },
  { original: 'Connecting human intelligence with agentic workflows.', translated: '인간의 지능과 에이전트 워크플로우를 연결하고 있습니다.' },
  { original: 'Voice stream active: "We build digital gourmet for humanity."', translated: '음성 스트림 활성: "우리는 인류를 위한 디지털 미식을 만듭니다."' },
  { original: 'Translating ambient sounds into structured insights.', translated: '주변 소리를 구조화된 통찰로 번역하는 중.' },
  { original: 'David approved the latest build with 0.01s latency.', translated: '디렉터 데이비드가 0.01초 대기 시간의 최신 빌드를 승인했습니다.' }
];

export default function Home() {
  const { products } = useProductStore();
  const { checkAndUse } = useFreemiumStore();
  const [logIndex, setLogIndex] = useState(0);

  // Auto-cycling translation logs for Somers UI Mockup
  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % translationLogs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleLaunch = (e, product) => {
    if (product.isPremium) {
      const { allowed } = checkAndUse();
      if (!allowed) {
        e.preventDefault();
        alert("일일 무료 체험(3회)이 모두 소진되었습니다. PRO 멤버십으로 업그레이드하세요.");
      }
    }
  };

  return (
    <main className="container" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      
      {/* 1. Hero Section (Extremely Minimalist) */}
      <section style={{ textAlign: 'center', marginBottom: '120px', padding: '0 24px' }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: '300', 
          lineHeight: '1.2', 
          marginBottom: '28px',
          letterSpacing: '-0.04em'
        }}>
          One Human, Infinite Agents.
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: 'var(--text-secondary)',
          fontWeight: '300',
          letterSpacing: '-0.02em',
          maxWidth: '650px',
          margin: '0 auto 16px',
          lineHeight: '1.5'
        }}>
          We build digital gourmet for humanity.
        </p>
        <p style={{ 
          fontSize: '0.9rem', 
          color: 'var(--text-secondary)',
          fontWeight: '300',
          letterSpacing: '-0.01em'
        }}>
          한 명의 인간과 무한한 에이전트. 우리는 인류를 위한 디지털 미식을 만듭니다.
        </p>
      </section>

      {/* 2. Flagship Project Section [SOMMERZ] */}
      <section style={{ marginBottom: '120px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '12px',
          marginBottom: '40px'
        }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '400', letterSpacing: '-0.02em' }}>
            Flagship Project: <span className="text-glow-green">SOMERZ</span>
          </h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
            STITCH VIBE ACTIVE
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          {/* Interactive UI Mockup */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            padding: '32px',
            position: 'relative',
            height: '280px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            fontFamily: 'monospace'
          }}>
            {/* Visualizer animation header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  backgroundColor: 'var(--accent-point)',
                  boxShadow: '0 0 8px var(--accent-point)',
                  display: 'inline-block',
                  animation: 'pulse 1.5s infinite alternate'
                }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-point)' }}>SOMERZ_MIC_ACTIVE</span>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>LATENCY: 12ms</span>
            </div>

            {/* Audio Wave Visualizer Simulation */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              height: '80px'
            }}>
              {[20, 60, 40, 80, 50, 90, 30, 70, 45, 85, 35, 65].map((val, idx) => (
                <div key={idx} style={{
                  width: '3px',
                  backgroundColor: 'var(--accent-point)',
                  borderRadius: '1.5px',
                  animation: `bounce ${1 + idx * 0.15}s ease-in-out infinite alternate`,
                  height: `${val}%`
                }} />
              ))}
            </div>

            {/* Translation Output Log */}
            <div style={{
              background: '#000',
              padding: '12px 16px',
              border: '1px solid rgba(255,255,255,0.04)',
              minHeight: '80px',
              fontSize: '0.8rem',
              lineHeight: '1.4',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <p style={{ color: 'var(--text-secondary)' }}>&gt; {translationLogs[logIndex].original}</p>
              <p style={{ color: 'var(--accent-point)', marginTop: '4px' }}>&gt; {translationLogs[logIndex].translated}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '400', marginBottom: '16px' }}>
              Somers Live Translator
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.7', fontSize: '0.95rem' }}>
              주변 언어를 실시간 감지하여 한국어로 번역하는 플래그십 AI 오디오 번역기입니다. 극도로 정제된 비주얼 인터페이스 속에 AI 크루들의 고도화된 번역 파이프라인이 유기적으로 내장되어 있습니다.
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '0.8rem', lineHeight: '1.6' }}>
              An revolutionary AI-powered translator that listens to surrounding speech and translates it in real-time. Built upon advanced agentic pipelines hidden behind an extremely clean tech shell.
            </p>
            <Link href="/products/somers" className="btn-accent">
              Launch Sommerz
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Showcase Section (All Projects) */}
      <section style={{ marginBottom: '120px' }}>
        <h2 style={{ 
          fontSize: '1.6rem', 
          fontWeight: '400', 
          borderBottom: '1px solid var(--border-subtle)', 
          paddingBottom: '12px', 
          marginBottom: '40px',
          letterSpacing: '-0.02em'
        }}>
          Digital Gourmet Showcase
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {products.map(product => (
            <div key={product.id} className="crew-card" style={{ height: '360px' }}>
              {/* Product Thumbnail or Fallback Grid */}
              <div className="crew-header">
                {product.thumbnail ? (
                  <div style={{ 
                    height: '140px', 
                    backgroundImage: `url(${product.thumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '1px solid var(--border-subtle)',
                    marginBottom: '20px'
                  }} />
                ) : (
                  <div style={{
                    height: '140px',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #050505 0%, #111 100%)',
                    marginBottom: '20px'
                  }}>
                    <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>TEXT ONLY UTILITY</span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--accent-point)', marginTop: '4px', letterSpacing: '0.1em' }}>MINIMAL TECH</span>
                  </div>
                )}
                
                <h3 style={{ fontSize: '1.4rem', fontWeight: '500', marginBottom: '8px' }}>{product.name}</h3>
              </div>

              <div className="crew-body" style={{ marginTop: '0px' }}>
                <p style={{ 
                  fontSize: '0.85rem', 
                  color: 'var(--text-secondary)', 
                  marginBottom: '24px', 
                  lineHeight: '1.5' 
                }}>
                  {product.description}
                </p>
                <Link 
                  href={product.launchUrl} 
                  className="btn-primary" 
                  style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}
                  onClick={(e) => handleLaunch(e, product)}
                >
                  Launch App
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Crew Section (The Crew - AI Agent Personas) */}
      <section>
        <h2 style={{ 
          fontSize: '1.6rem', 
          fontWeight: '400', 
          borderBottom: '1px solid var(--border-subtle)', 
          paddingBottom: '12px', 
          marginBottom: '40px',
          letterSpacing: '-0.02em'
        }}>
          The Crew
        </h2>

        <div className="crew-grid">
          {crewMembers.map(member => (
            <div key={member.id} className="crew-card">
              {/* Glowing Line Avatar in Background */}
              <div 
                className="crew-avatar-bg"
                style={{ backgroundImage: `url(${member.avatar})` }}
              />

              <div className="crew-header">
                <h3 className="crew-name">{member.name}</h3>
                <p className="crew-role">{member.role}</p>
                <span style={{ 
                  display: 'block', 
                  fontSize: '0.75rem', 
                  color: 'var(--text-muted)',
                  marginTop: '-12px',
                  marginBottom: '16px'
                }}>
                  {member.roleKo}
                </span>
              </div>

              <div className="crew-body">
                <div className="crew-description">
                  <p style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>
                    {member.description}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px' }}>
                    {member.descriptionEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Animation Styles Inline */}
      <style jsx global>{`
        @keyframes pulse {
          0% { opacity: 0.4; }
          100% { opacity: 1; }
        }
        @keyframes bounce {
          0% { transform: scaleY(0.3); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </main>
  );
}
