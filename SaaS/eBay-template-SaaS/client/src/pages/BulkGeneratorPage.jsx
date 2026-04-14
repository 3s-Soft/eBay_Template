import { useEffect, useMemo, useState } from "react";
import { http } from "../api/http";
import { TEMPLATE_VARIABLES } from "../constants/template";
import { downloadHtml } from "../utils/download";

const parseCsvHeaders = (line) => {
  const headers = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      headers.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  headers.push(current.trim());
  return headers.filter(Boolean);
};

export const BulkGeneratorPage = () => {
  const [templates, setTemplates] = useState([]);
  const [templateId, setTemplateId] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [mapping, setMapping] = useState({});
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      const response = await http.get("/templates");
      const available = response.data.templates || [];
      setTemplates(available);
      if (available.length) {
        setTemplateId(available[0]._id);
      }
    };

    load();
  }, []);

  const variableOptions = useMemo(
    () => TEMPLATE_VARIABLES.map((token) => token.replace(/[{}]/g, "")),
    []
  );

  const onCsvChange = async (file) => {
    setCsvFile(file);
    setGenerated([]);
    if (!file) {
      setHeaders([]);
      return;
    }

    const content = await file.text();
    const firstLine = content.split(/\r?\n/)[0] || "";
    const parsedHeaders = parseCsvHeaders(firstLine);
    setHeaders(parsedHeaders);

    const nextMapping = {};
    variableOptions.forEach((variable) => {
      if (parsedHeaders.includes(variable)) {
        nextMapping[variable] = variable;
      }
    });
    setMapping(nextMapping);
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!csvFile || !templateId) {
      return;
    }

    setGenerating(true);
    setMessage("");
    const formData = new FormData();
    formData.append("templateId", templateId);
    formData.append("mapping", JSON.stringify(mapping));
    formData.append("csv", csvFile);

    try {
      const response = await http.post("/bulk/generate", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setGenerated(response.data.generated || []);
      setMessage(`${response.data.count || 0} listings generated.`);
    } catch (error) {
      setMessage(error.response?.data?.message || "Bulk generation failed.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <section className="panel p-4">
        <h2 className="mb-3 text-lg font-semibold">Bulk Generator</h2>
        <form className="space-y-3" onSubmit={submit}>
          <label className="space-y-1">
            <span className="text-xs text-slate-500">Template</span>
            <select
              className="field"
              value={templateId}
              onChange={(event) => setTemplateId(event.target.value)}
              required
            >
              {templates.map((template) => (
                <option key={template._id} value={template._id}>
                  {template.name} {template.isPrebuilt ? "(Prebuilt)" : ""}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-xs text-slate-500">CSV Upload</span>
            <input
              className="field"
              type="file"
              accept=".csv,text/csv"
              onChange={(event) => onCsvChange(event.target.files?.[0] || null)}
              required
            />
          </label>

          {!!headers.length && (
            <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
              <h3 className="mb-2 text-sm font-semibold">Map CSV Fields to Variables</h3>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {variableOptions.map((variable) => (
                  <label key={variable} className="space-y-1">
                    <span className="text-xs text-slate-500">{`{{${variable}}}`}</span>
                    <select
                      className="field"
                      value={mapping[variable] || ""}
                      onChange={(event) =>
                        setMapping((prev) => ({ ...prev, [variable]: event.target.value }))
                      }
                    >
                      <option value="">Ignore</option>
                      {headers.map((header) => (
                        <option key={header} value={header}>
                          {header}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={generating}>
            {generating ? "Generating..." : "Generate Listings"}
          </button>
        </form>
      </section>

      {message && <p className="text-sm text-blue-600">{message}</p>}

      {!!generated.length && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Generated Listings</h2>
          <div className="space-y-3">
            {generated.map((item) => (
              <article key={item.row} className="panel p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-sm font-semibold">Row #{item.row}</div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => navigator.clipboard.writeText(item.html)}
                    >
                      Copy HTML
                    </button>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => downloadHtml(item.html, `listing-row-${item.row}.html`)}
                    >
                      Download
                    </button>
                  </div>
                </div>
                <div className="rounded border border-slate-200 p-2 text-xs dark:border-slate-700">
                  <pre className="overflow-x-auto whitespace-pre-wrap">{item.html}</pre>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
