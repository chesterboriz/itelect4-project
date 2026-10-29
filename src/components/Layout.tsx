import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Layout: React.FC = () => {
  const userName = useAuthStore((state) => state.userName);
  const logout = useAuthStore((state) => state.logout);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1.5 text-sm transition border-b-2 ${
      isActive
        ? "font-semibold text-white border-lasalle-gold"
        : "text-green-100 border-transparent hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <nav className="border-b-4 border-lasalle-gold bg-lasalle p-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-bold text-lg tracking-tight text-white">ITELECT4</span>
            <ul className="flex items-center gap-2">
              <li>
                <NavLink to="/" end className={linkClass}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/courses" className={linkClass}>
                  Courses
                </NavLink>
              </li>
              <li>
                <NavLink to="/submissions" className={linkClass}>
                  Submissions
                </NavLink>
              </li>
              <li>
                <NavLink to="/review" className={linkClass}>
                  AI Review
                </NavLink>
              </li>
              <li>
                <NavLink to="/items" className={linkClass}>
                  Lost Items
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-2">
            {userName === null ? (
              <>
                <NavLink to="/login" className={linkClass}>
                  Login
                </NavLink>
                <NavLink to="/register" className={linkClass}>
                  Register
                </NavLink>
              </>
            ) : (
              <button
                onClick={logout}
                className="rounded px-3 py-1.5 text-sm text-white hover:bg-lasalle-dark border border-green-200/50"
              >
                Logout ({userName})
              </button>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
