import React from 'react';

interface PlaceholderViewProps {
  title: string;
}

export const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title }) => {
  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', flex: 1 }}>
      <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1e293b', marginBottom: '16px' }}>{title}</h2>
      <div style={{ padding: '32px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', width: '100%', maxWidth: '600px', textAlign: 'center' }}>
        <p style={{ color: '#64748b', fontSize: '15px' }}>
          This page is currently under construction. Please check back later!
        </p>
      </div>
    </div>
  );
};
