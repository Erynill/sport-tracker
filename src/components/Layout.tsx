import { ChartLine, LayoutDashboard } from "lucide-react";
import { Outlet, NavLink } from "react-router-dom";

const links = [{ to: "/", label: "Dashboard", icon: LayoutDashboard }];

export default function Layout() {
  return (
    <div className="flex h-screen bg-app text-white">
      <aside className="flex flex-col w-1/4 bg-sidebar p-6 border-muted/30 border-r gap-10">
        <div className="flex flex-row gap-2">
          <div className="bg-accent p-1 rounded-lg">
            <ChartLine className="text-sidebar" />
          </div>
          <span className="font-bold text-xl">Sport tracker</span>
        </div>
        <nav className="flex flex-col gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex flex-row gap-2 p-1 rounded-lg ${isActive ? "bg-accent/10 font-medium text-accent-soft" : "text-muted"}`
              }
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
