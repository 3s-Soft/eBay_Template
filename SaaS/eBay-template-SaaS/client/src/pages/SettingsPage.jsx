import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export const SettingsPage = () => {
  const { user, updateBranding } = useAuth();
  const [form, setForm] = useState({
    logoUrl: "",
    primaryColor: "#0f172a",
    secondaryColor: "#334155",
    fontFamily: "Arial, sans-serif"
  });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    setForm({
      logoUrl: user.brandSettings?.logoUrl || "",
      primaryColor: user.brandSettings?.primaryColor || "#0f172a",
      secondaryColor: user.brandSettings?.secondaryColor || "#334155",
      fontFamily: user.brandSettings?.fontFamily || "Arial, sans-serif"
    });
  }, [user]);

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await updateBranding(form);
      setMessage("Brand settings saved.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <section className="panel max-w-3xl p-4">
        <h2 className="mb-3 text-lg font-semibold">Branding Settings</h2>
        <form className="space-y-3" onSubmit={submit}>
          <label className="space-y-1">
            <span className="text-xs text-slate-500">Logo URL</span>
            <input
              className="field"
              value={form.logoUrl}
              onChange={(event) => setForm({ ...form, logoUrl: event.target.value })}
              placeholder="https://yourcdn.com/logo.png"
            />
          </label>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <label className="space-y-1">
              <span className="text-xs text-slate-500">Primary Color</span>
              <input
                className="field"
                value={form.primaryColor}
                onChange={(event) => setForm({ ...form, primaryColor: event.target.value })}
              />
            </label>
            <label className="space-y-1">
              <span className="text-xs text-slate-500">Secondary Color</span>
              <input
                className="field"
                value={form.secondaryColor}
                onChange={(event) => setForm({ ...form, secondaryColor: event.target.value })}
              />
            </label>
          </div>
          <label className="space-y-1">
            <span className="text-xs text-slate-500">Brand Font Family</span>
            <input
              className="field"
              value={form.fontFamily}
              onChange={(event) => setForm({ ...form, fontFamily: event.target.value })}
            />
          </label>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </form>
      </section>
      {message && <p className="text-sm text-blue-600">{message}</p>}
    </div>
  );
};
