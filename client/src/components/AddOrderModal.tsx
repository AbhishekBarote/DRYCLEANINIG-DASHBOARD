import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Order, Garment } from '../App';

interface AddOrderModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const GarmentTypes = ['Shirt', 'Trousers', 'Dress', 'Jacket', 'Suit'];
const GarmentStatuses = ['received', 'in_cleaning', 'ready', 'delivered'];

export const AddOrderModal: React.FC<AddOrderModalProps> = ({ onClose, onSuccess }) => {
  const [customerName, setCustomerName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [total, setTotal] = useState('');
  const [garments, setGarments] = useState<Omit<Garment, 'id'>[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddGarment = () => {
    setGarments([...garments, { description: 'Shirt', status: 'received' }]);
  };

  const handleRemoveGarment = (index: number) => {
    setGarments(garments.filter((_, i) => i !== index));
  };

  const handleGarmentChange = (index: number, field: keyof Garment, value: string) => {
    const newGarments = [...garments];
    newGarments[index] = { ...newGarments[index], [field]: value };
    setGarments(newGarments);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !dueDate || !total || garments.length === 0) {
      alert("Please fill all fields and add at least one garment.");
      return;
    }

    setLoading(true);
    
    // Add temporary IDs for the new garments
    const formattedGarments = garments.map((g, i) => ({
      ...g,
      id: `G-TEMP-${Date.now()}-${i}`
    }));

    try {
      const res = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          dueDate,
          total: Number(total),
          garments: formattedGarments
        })
      });

      if (!res.ok) throw new Error('Failed to create order');
      onSuccess();
    } catch (err) {
      alert('Error creating order');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create New Order</h2>
          <button onClick={onClose} className="icon-button"><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label>Customer Name</label>
            <input 
              type="text" 
              value={customerName} 
              onChange={e => setCustomerName(e.target.value)} 
              placeholder="e.g. John Doe"
              required
            />
          </div>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Due Date</label>
              <input 
                type="date" 
                value={dueDate} 
                onChange={e => setDueDate(e.target.value)} 
                required
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Total Amount (₹)</label>
              <input 
                type="number" 
                value={total} 
                onChange={e => setTotal(e.target.value)} 
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="garments-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label>Garments ({garments.length})</label>
              <button type="button" onClick={handleAddGarment} className="btn-secondary btn-small">
                <Plus size={14} /> Add Item
              </button>
            </div>
            
            {garments.length === 0 && (
              <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '8px', color: '#94a3b8' }}>
                No garments added yet.
              </div>
            )}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {garments.map((g, index) => (
                <div key={index} className="garment-row">
                  <select 
                    value={g.description} 
                    onChange={e => handleGarmentChange(index, 'description', e.target.value)}
                  >
                    {GarmentTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                  
                  <select 
                    value={g.status} 
                    onChange={e => handleGarmentChange(index, 'status', e.target.value)}
                  >
                    {GarmentStatuses.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                  </select>
                  
                  <button type="button" onClick={() => handleRemoveGarment(index)} className="icon-button delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Create Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
