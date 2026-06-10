import React from 'react';

// NOTE: This component is intentionally NOT code-split (it is imported
// statically, never via LoadableComponents). It is the fallback shown when a
// page chunk fails to load, so it must not itself depend on a chunk that could
// fail. Styling is inline for the same reason — it must render even if other
// assets are unavailable.

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '64px 24px',
  minHeight: '40vh',
  color: '#172b4d',
};

const buttonStyle: React.CSSProperties = {
  marginTop: '24px',
  padding: '10px 20px',
  fontSize: '16px',
  fontWeight: 600,
  color: '#ffffff',
  backgroundColor: '#0052cc',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const ErrorFallback = () => (
  <div style={containerStyle}>
    <h2 style={{ marginBottom: '8px' }}>Something went wrong</h2>
    <p style={{ color: '#505f79', maxWidth: '420px' }}>
      This usually happens right after we ship an update. Reloading the page
      should fix it.
    </p>
    <button
      type="button"
      style={buttonStyle}
      onClick={() => window.location.reload()}
    >
      Reload page
    </button>
  </div>
);

export default ErrorFallback;
