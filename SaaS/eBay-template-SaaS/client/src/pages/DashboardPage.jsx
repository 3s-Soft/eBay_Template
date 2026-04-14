import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { http } from "../api/http";

export const DashboardPage = () => {
  const [stats, setStats] = useState({
    total: 0,
    custom: 0,
    prebuilt: 0
  });

  useEffect(() => {
    const load = async () => {
      const response = await http.get("/templates");
      const templates = response.data.templates || [];
      setStats({
        total: templates.length,
        custom: templates.filter((template) => !template.isPrebuilt).length,
        prebuilt: templates.filter((template) => template.isPrebuilt).length
      });
    };

    load();
  }, []);

  return (
    <div className="space-y-4">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="panel p-4">
          <div className="text-sm text-slate-500">Total Templates</div>
          <div className="mt-1 text-2xl font-semibold">{stats.total}</div>
        </div>
        <div className="panel p-4">
          <div className="text-sm text-slate-500">My Templates</div>
          <div className="mt-1 text-2xl font-semibold">{stats.custom}</div>
        </div>
        <div className="panel p-4">
          <div className="text-sm text-slate-500">Prebuilt Library</div>
          <div className="mt-1 text-2xl font-semibold">{stats.prebuilt}</div>
        </div>
      </section>

      <section className="panel p-4">
        <h2 className="mb-2 text-lg font-semibold">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <Link to="/builder" className="btn-primary">
            Create New Template
          </Link>
          <Link to="/templates" className="btn-secondary">
            Manage Templates
          </Link>
          <Link to="/bulk" className="btn-secondary">
            Bulk Generate Listings
          </Link>
        </div>
      </section>

      <section className="panel p-4">
        <h2 className="mb-2 text-lg font-semibold">MVP Highlights</h2>
        <ul className="list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-300">
          <li>Reusable block-based template builder with drag-and-drop sorting.</li>
          <li>Dynamic Handlebars variables for fast listing personalization.</li>
          <li>CSV bulk listing generator with field mapping to template variables.</li>
        </ul>
      </section>
    </div>
  );
};
