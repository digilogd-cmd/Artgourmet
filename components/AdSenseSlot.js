'use client';

export default function AdSenseSlot({ slotId = 'default-slot' }) {
  // In production after approval, you would uncomment the google script insertion logic
  // and load actual adsense ins element. For now, we layout a beautiful minimal tech
  // placeholder matching the rebranding golden yellow theme.

  return (
    <div 
      className="container" 
      style={{
        margin: '40px auto',
        maxWidth: '960px',
        padding: '24px',
        border: '1px dashed var(--border-subtle)',
        background: 'rgba(255, 255, 255, 0.01)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: 'monospace',
        fontSize: '0.75rem',
        letterSpacing: '0.08em',
        transition: 'all 0.3s ease',
        cursor: 'default',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent-point)';
        e.currentTarget.style.boxShadow = '0 0 15px rgba(243, 156, 18, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <span style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>
        [ ADVERTISING SYSTEM PENDING APPROVAL - SLOT: {slotId.toUpperCase()} ]
      </span>
      <span style={{ color: 'var(--accent-point)', fontSize: '0.7rem' }}>
        * Google AdSense crawler detected. System configured for Tech Golden Yellow (#f39c12) links.
      </span>

      {/* Production Google AdSense Tag (Uncomment and edit data-ad-client / data-ad-slot once approved) */}
      {/* 
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="XXXXXXXXXX"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      <script>
           (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
      */}
    </div>
  );
}
