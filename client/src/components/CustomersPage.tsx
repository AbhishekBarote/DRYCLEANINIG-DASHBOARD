import React, { useMemo } from 'react';
import { Order } from '../App';

interface CustomersPageProps {
  orders: Order[];
}

export const CustomersPage: React.FC<CustomersPageProps> = ({ orders }) => {
  const customers = useMemo(() => {
    const customerMap: Record<string, { name: string; totalOrders: number; totalSpent: number; lastOrder: string }> = {};

    orders.forEach(order => {
      if (!customerMap[order.customerName]) {
        customerMap[order.customerName] = {
          name: order.customerName,
          totalOrders: 0,
          totalSpent: 0,
          lastOrder: order.createdAt
        };
      }
      
      const c = customerMap[order.customerName];
      c.totalOrders += 1;
      c.totalSpent += (order.total || 0);
      if (new Date(order.createdAt) > new Date(c.lastOrder)) {
        c.lastOrder = order.createdAt;
      }
    });

    return Object.values(customerMap).sort((a, b) => b.totalSpent - a.totalSpent);
  }, [orders]);

  return (
    <div style={{ padding: '32px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>Customers</h2>

      <div className="card">
        {customers.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            No customers found.
          </div>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Total Orders</th>
                <th>Total Spent</th>
                <th>Last Order Date</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 500 }}>{c.name}</td>
                  <td>{c.totalOrders}</td>
                  <td>₹{c.totalSpent.toLocaleString()}</td>
                  <td>{new Date(c.lastOrder).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
