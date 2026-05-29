import React from 'react';
import { Order } from '../App';

interface UpcomingPickupsProps {
  orders: Order[];
}

const getOverallStatus = (order: Order) => {
  if (order.garments.length === 0) return 'Received';
  if (order.garments.every(g => g.status === 'delivered')) return 'Delivered';
  if (order.garments.every(g => g.status === 'ready' || g.status === 'delivered')) return 'Ready';
  if (order.garments.some(g => g.status === 'in_cleaning')) return 'In Cleaning';
  return 'Received';
};

const UpcomingPickups: React.FC<UpcomingPickupsProps> = ({ orders }) => {
  // Sort by due date, take first 4 that are not delivered
  const pickups = [...orders]
    .filter(o => getOverallStatus(o) !== 'Delivered')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 4);

  return (
    <div className="card" style={{ flex: 1 }}>
      <div className="card-header">
        <div className="card-title">Upcoming Pickups</div>
        <a href="#" className="card-action">View calendar</a>
      </div>
      
      <div className="pickup-list">
        {pickups.length === 0 && (
          <div style={{ color: '#64748b', fontSize: '13px', textAlign: 'center', padding: '20px' }}>
            No upcoming pickups.
          </div>
        )}
        {pickups.map((pickup, idx) => {
          const status = getOverallStatus(pickup);
          // Just format the time part of the dueDate if possible, otherwise use a placeholder since dueDate is a date string
          // We'll mock a time based on index for visual fidelity to original design, or use the real date
          const dateStr = new Date(pickup.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          
          return (
            <div className="pickup-item" key={idx}>
              <div className="pickup-time">{dateStr}</div>
              <div className="pickup-details">
                <div className="pickup-name">{pickup.customerName}</div>
                <div className="pickup-sub">{pickup.id} • {pickup.garments.length} items</div>
              </div>
              <div className="pickup-status">
                <span className={`status-badge ${status === 'Ready' ? 'ready' : 'in_cleaning'}`}>
                  {status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingPickups;
