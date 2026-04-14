import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../api/http";

const TemplateCard = ({ template, onEdit, onDelete, onDuplicate }) => {
  return (
    <article className="panel p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold">{template.name}</h3>
          <p className="text-xs text-slate-500">{template.category}</p>
          {template.description && (
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {template.description}
            </p>
          )}
        </div>
        <span
          className={`rounded-full px-2 py-1 text-xs ${
            template.isPrebuilt
              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
              : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
          }`}
        >
          {template.isPrebuilt ? "Prebuilt" : "Custom"}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {!template.isPrebuilt && (
          <>
            <button type="button" className="btn-secondary" onClick={() => onEdit?.(template)}>
              Edit
            </button>
            <button type="button" className="btn-danger" onClick={() => onDelete?.(template)}>
              Delete
            </button>
          </>
        )}
        <button type="button" className="btn-primary" onClick={() => onDuplicate(template)}>
          {template.isPrebuilt ? "Use Template" : "Duplicate"}
        </button>
      </div>
    </article>
  );
};

export const MyTemplatesPage = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    http.get("/templates").then((response) => {
      if (mounted) {
        setTemplates(response.data.templates || []);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const refreshTemplates = async () => {
    const response = await http.get("/templates");
    setTemplates(response.data.templates || []);
  };

  const handleDelete = async (template) => {
    await http.delete(`/templates/${template._id}`);
    setMessage("Template deleted.");
    await refreshTemplates();
  };

  const handleDuplicate = async (template) => {
    const response = await http.post(`/templates/${template._id}/duplicate`);
    navigate(`/builder/${response.data.template._id}`);
  };

  const customTemplates = templates.filter((template) => !template.isPrebuilt);
  const prebuiltTemplates = templates.filter((template) => template.isPrebuilt);

  return (
    <div className="space-y-4">
      {message && <p className="text-sm text-blue-600">{message}</p>}

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">My Templates</h2>
          <button className="btn-primary" onClick={() => navigate("/builder")}>
            New Template
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {customTemplates.map((template) => (
            <TemplateCard
              key={template._id}
              template={template}
              onEdit={(currentTemplate) => navigate(`/builder/${currentTemplate._id}`)}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
            />
          ))}
          {!customTemplates.length && (
            <div className="panel p-4 text-sm text-slate-500">
              No custom templates yet.
            </div>
          )}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Template Library</h2>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {prebuiltTemplates.map((template) => (
            <TemplateCard
              key={template._id}
              template={template}
              onDuplicate={handleDuplicate}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
