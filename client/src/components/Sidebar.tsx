import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  ShoppingBag, 
  Users, 
  Shirt, 
  Truck, 
  CreditCard, 
  BarChart2, 
  Box, 
  Package, 
  Settings, 
  Users as UsersIcon,
  HelpCircle
} from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">
          <Shirt size={24} color="white" />
        </div>
        <div className="logo-text">
          <span className="qdc">QDC</span>
          <span className="subtitle">Quick Dry Cleaning</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              <Home size={18} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={({ isActive }) => (isActive ? 'active' : '')}>
              <ShoppingBag size={18} />
              <span>Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/customers" className={({ isActive }) => (isActive ? 'active' : '')}>
              <Users size={18} />
              <span>Customers</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/garments" className={({ isActive }) => (isActive ? 'active' : '')}>
              <Shirt size={18} />
              <span>Garments</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/deliveries" className={({ isActive }) => (isActive ? 'active' : '')}>
              <Truck size={18} />
              <span>Deliveries</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/billing" className={({ isActive }) => (isActive ? 'active' : '')}>
              <CreditCard size={18} />
              <span>Billing</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" className={({ isActive }) => (isActive ? 'active' : '')}>
              <BarChart2 size={18} />
              <span>Reports</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
              <Box size={18} />
              <span>Products & Services</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/packages" className={({ isActive }) => (isActive ? 'active' : '')}>
              <Package size={18} />
              <span>Packages</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/store-settings" className={({ isActive }) => (isActive ? 'active' : '')}>
              <Settings size={18} />
              <span>Store Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/users-roles" className={({ isActive }) => (isActive ? 'active' : '')}>
              <UsersIcon size={18} />
              <span>Users & Roles</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <ul>
          <li>
            <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
              <Settings size={18} />
              <span>Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/help" className={({ isActive }) => (isActive ? 'active' : '')}>
              <HelpCircle size={18} />
              <span>Help & Support</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
