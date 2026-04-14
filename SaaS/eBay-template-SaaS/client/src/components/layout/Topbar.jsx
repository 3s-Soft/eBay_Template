import { LogOut, Moon, Sun } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

export const Topbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 md:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold md:text-lg">
            eBay Template Designer & Listing Generator
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Build once. Generate listings at scale.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" className="btn-secondary" onClick={toggleTheme}>
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <div className="hidden text-sm text-slate-600 dark:text-slate-300 md:block">
            {user?.name}
          </div>
          <button type="button" className="btn-secondary gap-2" onClick={logout}>
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};
