import React from 'react';
import { Order } from '../App';

interface OrdersPageProps {
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

export const OrdersPage: React.FC<OrdersPageProps> = ({ orders }) => {
  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600 }}>All Orders</h2>
      </div>

      <div className="card">
        {orders.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            No orders found.
          </div>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Created At</th>
                <th>Due Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const status = getOverallStatus(order);
                const createdDate = new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                return (
                  <tr key={order.id}>
                    <td style={{ fontWeight: 500 }}>{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{createdDate}</td>
                    <td>{order.dueDate}</td>
                    <td>{order.garments.length}</td>
                    <td>₹{order.total?.toLocaleString()}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(status)}`}>
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
