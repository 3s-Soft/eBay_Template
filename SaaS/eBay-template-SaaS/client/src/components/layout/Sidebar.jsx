import { LayoutDashboard, Library, PencilRuler, Settings, Upload } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/builder", label: "Template Builder", icon: PencilRuler },
  { to: "/templates", label: "My Templates", icon: Library },
  { to: "/bulk", label: "Bulk Generator", icon: Upload },
  { to: "/settings", label: "Settings", icon: Settings }
];

export const Sidebar = () => {
  return (
    <aside className="hidden w-64 border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:block">
      <div className="mb-8">
        <div className="text-lg font-semibold text-blue-600">eBay Designer</div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          SaaS Listing Studio
        </p>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`
              }
            >
              <Icon size={17} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
