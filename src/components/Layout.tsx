import { ChartLine, LayoutDashboard, RotateCcwClock, Settings } from "lucide-react";
import { Outlet, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/history", label: "Historique", icon: RotateCcwClock },
  { to: "/settings", label: "Réglages", icon: Settings },
];

export default function Layout() {
  return (
    <div className="flex h-screen bg-app text-white font-medium">
      <aside className="flex flex-col w-1/5 bg-sidebar p-6 border-line border-r gap-10">
        <div className="flex flex-row gap-2 items-center">
          <div className="bg-accent p-1 rounded-lg">
            <ChartLine className="text-sidebar" />
          </div>
          <p className="font-bold text-2xl">Sport tracker</p>
        </div>
        <nav className="flex flex-col gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex flex-row gap-2 p-1 rounded-lg transition-colors ${isActive ? "bg-accent/10 text-accent-soft" : "text-muted hover:bg-card hover:text-white/80"}`
              }
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="p-8 w-4/5">
        <Outlet />
      </main>
    </div>
  );
}
