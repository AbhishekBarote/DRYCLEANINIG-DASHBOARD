import React, { useMemo, useState } from 'react';
import { Order } from '../App';

interface GarmentsPageProps {
  orders: Order[];
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'ready': return 'ready';
    case 'in_cleaning': return 'in_cleaning';
    case 'received': return 'received';
    case 'delivered': return 'delivered';
    default: return 'received';
  }
};

const formatStatus = (status: string) => {
  return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

type StatusFilter = 'all' | 'received' | 'in_cleaning' | 'ready' | 'delivered';

export const GarmentsPage: React.FC<GarmentsPageProps> = ({ orders }) => {
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');

  const garmentsList = useMemo(() => {
    let allGarments = orders.flatMap(order => 
      order.garments.map(g => ({
        ...g,
        orderId: order.id,
        customerName: order.customerName,
        dueDate: order.dueDate
      }))
    );
    
    if (selectedStatus !== 'all') {
      allGarments = allGarments.filter(g => g.status === selectedStatus);
    }
    
    return allGarments;
  }, [orders, selectedStatus]);

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600 }}>All Garments</h2>
        <select 
          value={selectedStatus} 
          onChange={(e) => setSelectedStatus(e.target.value as StatusFilter)}
          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', backgroundColor: 'white' }}
        >
          <option value="all">All Statuses</option>
          <option value="received">Received</option>
          <option value="in_cleaning">In Cleaning</option>
          <option value="ready">Ready</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      <div className="card">
        {garmentsList.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            {selectedStatus === 'all' ? 'No garments found.' : `No garments found with status "${formatStatus(selectedStatus)}".`}
          </div>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Garment ID</th>
                <th>Description</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {garmentsList.map((g, idx) => (
                <tr key={idx}>
                  <td style={{ color: '#64748b', fontSize: '13px' }}>{g.id}</td>
                  <td style={{ fontWeight: 500 }}>{g.description}</td>
                  <td>{g.orderId}</td>
                  <td>{g.customerName}</td>
                  <td>{g.dueDate}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(g.status)}`}>
                      {formatStatus(g.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
