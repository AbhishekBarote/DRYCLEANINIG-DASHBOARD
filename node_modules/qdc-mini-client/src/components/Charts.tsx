import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Order } from '../App';

interface ChartsProps {
  orders: Order[];
}

export const OrdersTrendChart: React.FC<ChartsProps> = ({ orders }) => {
  const trendData = useMemo(() => {
    // Group orders by date
    const groups: Record<string, number> = {};
    
    orders.forEach(order => {
      const date = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      groups[date] = (groups[date] || 0) + 1;
    });

    // Create a generic array or just use groups
    const data = Object.keys(groups).map(date => ({
      name: date,
      orders: groups[date]
    })).reverse(); // Assuming orders are newest first, we reverse for chronological order on chart

    // If less than 7 days of data, pad it
    if (data.length === 0) {
      return [{ name: 'Today', orders: 0 }];
    }
    return data;
  }, [orders]);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Orders Trend</div>
        <select style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #e2e8f0', outline: 'none' }}>
          <option>Last 7 days</option>
        </select>
      </div>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={3} dot={true} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const OrdersStatusChart: React.FC<ChartsProps> = ({ orders }) => {
  const statusData = useMemo(() => {
    const counts = {
      Received: 0,
      'In Cleaning': 0,
      Ready: 0,
      'Out for Delivery': 0,
      Delivered: 0
    };

    orders.forEach(o => {
      o.garments.forEach(g => {
        if (g.status === 'received') counts['Received']++;
        else if (g.status === 'in_cleaning') counts['In Cleaning']++;
        else if (g.status === 'ready') counts['Ready']++;
        else if (g.status === 'delivered') counts['Delivered']++;
      });
    });

    const totalGarments = Object.values(counts).reduce((a, b) => a + b, 0);

    return [
      { name: 'Received', value: counts['Received'], color: '#94a3b8' },
      { name: 'In Cleaning', value: counts['In Cleaning'], color: '#3b82f6' },
      { name: 'Ready', value: counts['Ready'], color: '#22c55e' },
      { name: 'Out for Delivery', value: counts['Out for Delivery'], color: '#f97316' },
      { name: 'Delivered', value: counts['Delivered'], color: '#a855f7' },
    ].filter(s => s.value > 0).map(s => ({ ...s, percentage: totalGarments > 0 ? Math.round((s.value / totalGarments) * 100) : 0 }));
  }, [orders]);

  return (
    <div className="card" style={{ height: '320px' }}>
      <div className="card-title" style={{ marginBottom: '16px' }}>Garments by Status</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '50%', height: 200 }}>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '13px' }}>
              No data
            </div>
          )}
        </div>
        <div style={{ width: '50%', paddingLeft: '16px' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px' }}>
            {statusData.map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color }}></div>
                  <span>{item.name}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 600 }}>{item.value}</span>
                  <span style={{ color: '#64748b', marginLeft: '4px' }}>({item.percentage}%)</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
