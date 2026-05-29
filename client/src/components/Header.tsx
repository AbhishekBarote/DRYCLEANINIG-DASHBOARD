import React from 'react';
import { Search, Bell, Calendar, Plus } from 'lucide-react';

interface HeaderProps {
  onAddOrder?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddOrder }) => {
  return (
    <div className="header">
      <div className="greeting">
        <h1>Good morning, Alex 👋</h1>
        <p>Here's what's happening with your store today.</p>
      </div>

      <div className="header-actions">
        {onAddOrder && (
          <button onClick={onAddOrder} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={16} /> New Order
          </button>
        )}
        
        <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder="Search orders, customers..." />
        </div>

        <div className="notification-btn">
          <Bell size={20} color="#64748b" />
          <div className="notification-dot"></div>
        </div>

        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">Alex Manager</span>
            <span className="user-role">Store Manager</span>
          </div>
          <div className="user-avatar">
            AM
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
