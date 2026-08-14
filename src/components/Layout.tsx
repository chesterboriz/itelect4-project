import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div>
      <nav className="bg-white border-b p-4">
        <ul className="flex gap-4">
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'font-bold' : undefined)}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/items" className={({ isActive }) => (isActive ? 'font-bold' : undefined)}>
              Items
            </NavLink>
          </li>
          <li>
            <NavLink to="/account" className={({ isActive }) => (isActive ? 'font-bold' : undefined)}>
              Account
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'font-bold' : undefined)}>
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
