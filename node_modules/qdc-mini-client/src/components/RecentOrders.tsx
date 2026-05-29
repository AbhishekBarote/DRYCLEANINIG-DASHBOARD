import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Order } from '../App';

interface RecentOrdersProps {
  orders: Order[];
}

const getOverallStatus = (order: Order) => {
  if (order.garments.length === 0) return 'Received';
  if (order.garments.every(g => g.status === 'delivered')) return 'Delivered';
  if (order.garments.every(g => g.status === 'ready' || g.status === 'delivered')) return 'Ready';
  if (order.garments.some(g => g.status === 'in_cleaning')) return 'In Cleaning';
  return 'Received';
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Ready': return 'ready';
    case 'In Cleaning': return 'in_cleaning';
    case 'Received': return 'received';
    case 'Delivered': return 'delivered';
    default: return 'received';
  }
};

const RecentOrders: React.FC<RecentOrdersProps> = ({ orders }) => {
  // Show up to 5 most recent orders
  const displayOrders = orders.slice(0, 5);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Recent Orders</div>
        <a href="#" className="card-action">View all orders &gt;</a>
      </div>
      
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Garments</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {displayOrders.map((order) => {
            const status = getOverallStatus(order);
            return (
              <tr key={order.id}>
                <td style={{ fontWeight: 500 }}>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.garments.length} items</td>
                <td>
                  <span className={`status-badge ${getStatusClass(status)}`}>
                    {status}
                  </span>
                </td>
                <td>{order.dueDate || '-'}</td>
                <td>₹{order.total?.toLocaleString() || '0'}</td>
                <td><ChevronRight size={16} color="#94a3b8" /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {orders.length > 5 && (
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <a href="#" className="card-action">View all orders</a>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
