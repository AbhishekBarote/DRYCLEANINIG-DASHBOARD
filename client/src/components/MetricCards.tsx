import React from 'react';
import { ShoppingBag, Shirt, CheckCircle, Truck, DollarSign, ArrowUp } from 'lucide-react';
import { Order } from '../App';

interface MetricCardsProps {
  orders: Order[];
}

const MetricCards: React.FC<MetricCardsProps> = ({ orders }) => {
  const totalOrders = orders.length;
  
  let inCleaning = 0;
  let ready = 0;
  
  orders.forEach(o => {
    o.garments.forEach(g => {
      if (g.status === 'in_cleaning') inCleaning++;
      if (g.status === 'ready') ready++;
    });
  });

  const outForDelivery = orders.filter(o => 
    o.garments.some(g => g.status === 'delivered') || o.garments.every(g => g.status === 'ready')
  ).length; // Just a mock calculation

  const revenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

  return (
    <div className="metrics-grid">
      <div className="metric-card">
        <div className="metric-icon" style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
          <ShoppingBag size={24} />
        </div>
        <div className="metric-content">
          <div className="metric-title">Total Orders</div>
          <div className="metric-value">{totalOrders}</div>
          {totalOrders > 0 && <div className="metric-trend"><ArrowUp size={12} /> New activity</div>}
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-icon" style={{ backgroundColor: '#fff7ed', color: '#f97316' }}>
          <Shirt size={24} />
        </div>
        <div className="metric-content">
          <div className="metric-title">In Cleaning</div>
          <div className="metric-value">{inCleaning}</div>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-icon" style={{ backgroundColor: '#f0fdf4', color: '#22c55e' }}>
          <CheckCircle size={24} />
        </div>
        <div className="metric-content">
          <div className="metric-title">Ready for Pickup</div>
          <div className="metric-value">{ready}</div>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-icon" style={{ backgroundColor: '#f3e8ff', color: '#a855f7' }}>
          <Truck size={24} />
        </div>
        <div className="metric-content">
          <div className="metric-title">Out for Delivery</div>
          <div className="metric-value">{outForDelivery}</div>
        </div>
      </div>

      <div className="metric-card" style={{ backgroundColor: '#fdf2f8', borderColor: '#fbcfe8' }}>
        <div className="metric-icon" style={{ backgroundColor: '#fce7f3', color: '#ec4899' }}>
          <DollarSign size={24} />
        </div>
        <div className="metric-content">
          <div className="metric-title">Total Revenue</div>
          <div className="metric-value">₹{revenue.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default MetricCards;
