import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { http } from "../api/http";
import {
  BLOCK_DEFAULTS,
  DEFAULT_GLOBAL_STYLES,
  DEFAULT_SAMPLE_DATA
} from "../constants/template";
import { buildPreviewHtml } from "../utils/templateRuntime";
import { downloadHtml } from "../utils/download";
import { BlockPalette } from "../components/template/BlockPalette.jsx";
import { BuilderCanvas } from "../components/template/BuilderCanvas.jsx";
import { BlockEditor } from "../components/template/BlockEditor.jsx";
import { GlobalStyleEditor } from "../components/template/GlobalStyleEditor.jsx";
import { LivePreview } from "../components/template/LivePreview.jsx";
import { VariableChips } from "../components/template/VariableChips.jsx";

const DEFAULT_BLOCK_STYLE = {
  textColor: "#111827",
  backgroundColor: "#ffffff",
  fontFamily: "Arial, sans-serif",
  fontSize: "14px",
  padding: "12px",
  margin: "0 0 12px 0",
  borderRadius: "6px",
  border: "1px solid #e5e7eb"
};

const createId = (prefix) =>
  `${prefix}-${globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`}`;

const createBlock = (type) => ({
  id: createId(type),
  ...JSON.parse(JSON.stringify(BLOCK_DEFAULTS[type])),
  style: { ...DEFAULT_BLOCK_STYLE }
});

const defaultBlocks = () => [
  createBlock("title"),
  createBlock("imageGallery"),
  createBlock("description"),
  createBlock("specsTable"),
  createBlock("shippingReturns")
];

const normalizeBlocks = (blocks = []) =>
  blocks.map((block) => ({
    ...block,
    id: block.id || createId(block.type || "block"),
    style: {
      ...DEFAULT_BLOCK_STYLE,
      ...block.style
    }
  }));

export const TemplateBuilderPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [templateId, setTemplateId] = useState(id || "");
  const [name, setName] = useState("Untitled Template");
  const [category, setCategory] = useState("General");
  const [description, setDescription] = useState("");
  const [globalStyles, setGlobalStyles] = useState(DEFAULT_GLOBAL_STYLES);
  const [blocks, setBlocks] = useState(defaultBlocks());
  const [sampleData, setSampleData] = useState(DEFAULT_SAMPLE_DATA);
  const [selectedBlockId, setSelectedBlockId] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [serverHtml, setServerHtml] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [generatingAi, setGeneratingAi] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  const selectedBlock = useMemo(
    () => blocks.find((block) => block.id === selectedBlockId),
    [blocks, selectedBlockId]
  );

  const livePreviewHtml = useMemo(() => {
    return buildPreviewHtml({
      blocks,
      globalStyles,
      data: sampleData
    });
  }, [blocks, globalStyles, sampleData]);

  const effectiveHtml = serverHtml || livePreviewHtml;
  const previewImages = (sampleData.images || "")
    .split(/[|,]/)
    .map((value) => value.trim())
    .filter(Boolean);

  useEffect(() => {
    setTemplateId(id || "");

    if (!id) {
      const nextDefaults = defaultBlocks();
      setName("Untitled Template");
      setCategory("General");
      setDescription("");
      setBlocks(nextDefaults);
      setSelectedBlockId(nextDefaults[0]?.id || "");
      setGlobalStyles(DEFAULT_GLOBAL_STYLES);
      setServerHtml("");
      return;
    }

    const loadTemplate = async () => {
      const response = await http.get(`/templates/${id}`);
      const template = response.data.template;
      const nextBlocks = normalizeBlocks(template.blocks || []);

      setName(template.name || "");
      setCategory(template.category || "General");
      setDescription(template.description || "");
      setBlocks(nextBlocks);
      setGlobalStyles({
        ...DEFAULT_GLOBAL_STYLES,
        ...template.globalStyles
      });
      setSelectedBlockId(nextBlocks[0]?.id || "");
      setServerHtml("");
    };

    loadTemplate().catch(() => {
      setNotice("Failed to load template.");
    });
  }, [id]);

  const onAddBlock = (type) => {
    const newBlock = createBlock(type);
    setBlocks((prev) => [...prev, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  const onUpdateBlock = (blockId, updater) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === blockId ? updater(block) : block))
    );
  };

  const onDeleteBlock = (blockId) => {
    setBlocks((prev) => {
      const next = prev.filter((block) => block.id !== blockId);
      if (selectedBlockId === blockId) {
        setSelectedBlockId(next[0]?.id || "");
      }
      return next;
    });
  };

  const insertVariable = (variable) => {
    if (!focusedField) {
      setNotice("Select a text field first, then insert a variable.");
      return;
    }

    setNotice("");
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== focusedField.blockId) {
          return block;
        }

        if (focusedField.field.startsWith("rows.")) {
          const [, rowIndexRaw, rowKey] = focusedField.field.split(".");
          const rowIndex = Number(rowIndexRaw);
          const rows = Array.isArray(block.content?.rows) ? block.content.rows : [];
          const nextRows = rows.map((row, index) =>
            index === rowIndex
              ? { ...row, [rowKey]: `${row[rowKey] || ""}${variable}` }
              : row
          );

          return {
            ...block,
            content: {
              ...block.content,
              rows: nextRows
            }
          };
        }

        return {
          ...block,
          content: {
            ...block.content,
            [focusedField.field]: `${block.content?.[focusedField.field] || ""}${variable}`
          }
        };
      })
    );
  };

  const saveTemplate = async () => {
    setSaving(true);
    setNotice("");
    const payload = {
      name,
      category,
      description,
      blocks,
      globalStyles
    };

    try {
      if (templateId) {
        await http.put(`/templates/${templateId}`, payload);
        setNotice("Template updated.");
      } else {
        const response = await http.post("/templates", payload);
        const nextId = response.data.template._id;
        setTemplateId(nextId);
        navigate(`/builder/${nextId}`, { replace: true });
        setNotice("Template created.");
      }
    } catch (error) {
      setNotice(error.response?.data?.message || "Failed to save template.");
    } finally {
      setSaving(false);
    }
  };

  const renderBackendHtml = async () => {
    setNotice("");
    try {
      const response = templateId
        ? await http.post(`/templates/${templateId}/generate`, { data: sampleData })
        : await http.post("/templates/preview", {
            blocks,
            globalStyles,
            data: sampleData
          });

      setServerHtml(response.data.html);
      setNotice("Backend HTML generated.");
    } catch (error) {
      setNotice(error.response?.data?.message || "Failed to generate HTML.");
    }
  };

  const copyHtml = async () => {
    await navigator.clipboard.writeText(effectiveHtml);
    setNotice("HTML copied.");
  };

  const generateAiDescription = async () => {
    setGeneratingAi(true);
    setNotice("");
    try {
      const response = await http.post("/ai/description", sampleData);
      const nextDescription = response.data.description || "";
      setSampleData((prev) => ({ ...prev, description: nextDescription }));
      setBlocks((prev) =>
        prev.map((block) =>
          block.type === "description"
            ? {
                ...block,
                content: {
                  ...block.content,
                  body: nextDescription
                }
              }
            : block
        )
      );
      setNotice("AI description generated.");
    } catch (error) {
      setNotice(error.response?.data?.message || "AI generation failed.");
    } finally {
      setGeneratingAi(false);
    }
  };

  const uploadImageFiles = async (files) => {
    if (!files?.length) {
      return;
    }

    setUploadingImages(true);
    setNotice("");
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("images", file));

    try {
      const response = await http.post("/uploads/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      const uploadedUrls = response.data.imageUrls || [];
      setSampleData((prev) => {
        const existing = (prev.images || "")
          .split(/[|,]/)
          .map((value) => value.trim())
          .filter(Boolean);
        return {
          ...prev,
          images: [...existing, ...uploadedUrls].join("|")
        };
      });
      setNotice("Images uploaded.");
    } catch (error) {
      setNotice(error.response?.data?.message || "Image upload failed.");
    } finally {
      setUploadingImages(false);
    }
  };

  return (
    <div className="space-y-4">
      <section className="panel p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <input
            className="field md:col-span-2"
            placeholder="Template name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            className="field"
            placeholder="Category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
          <button className="btn-primary" onClick={saveTemplate} disabled={saving}>
            {saving ? "Saving..." : "Save Template"}
          </button>
        </div>
        <textarea
          className="field mt-3 min-h-20"
          placeholder="Template description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" className="btn-secondary" onClick={renderBackendHtml}>
            Generate eBay HTML
          </button>
          <button type="button" className="btn-secondary" onClick={copyHtml}>
            Copy HTML
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => downloadHtml(effectiveHtml, `${name || "template"}.html`)}
          >
            Download HTML
          </button>
        </div>
        {!!notice && <p className="mt-2 text-sm text-blue-600">{notice}</p>}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="space-y-4 xl:col-span-3">
          <BlockPalette onAddBlock={onAddBlock} />
          <VariableChips onInsert={insertVariable} />
          <GlobalStyleEditor globalStyles={globalStyles} onChange={setGlobalStyles} />
          <div className="panel p-4">
            <h3 className="mb-3 text-sm font-semibold">Sample Product Data</h3>
            <div className="mb-3 flex flex-wrap gap-2">
              <button
                type="button"
                className="btn-secondary"
                onClick={generateAiDescription}
                disabled={generatingAi}
              >
                {generatingAi ? "Generating..." : "AI Description"}
              </button>
              <label className="btn-secondary cursor-pointer">
                {uploadingImages ? "Uploading..." : "Upload Images"}
                <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => uploadImageFiles(event.target.files)}
                  disabled={uploadingImages}
                />
              </label>
            </div>
            <div className="space-y-2">
              {Object.entries(sampleData).map(([key, value]) => (
                <label key={key} className="space-y-1">
                  <span className="text-xs font-medium text-slate-500">{key}</span>
                  {key === "description" ? (
                    <textarea
                      className="field min-h-20"
                      value={value}
                      onChange={(event) =>
                        setSampleData((prev) => ({ ...prev, [key]: event.target.value }))
                      }
                    />
                  ) : (
                    <input
                      className="field"
                      value={value}
                      onChange={(event) =>
                        setSampleData((prev) => ({ ...prev, [key]: event.target.value }))
                      }
                    />
                  )}
                </label>
              ))}
            </div>
            {!!previewImages.length && (
              <div className="mt-3">
                <h4 className="mb-2 text-xs font-semibold text-slate-500">
                  Uploaded/Linked Images
                </h4>
                <div className="flex flex-wrap gap-2">
                  {previewImages.map((url) => (
                    <img
                      key={url}
                      src={url}
                      alt="Uploaded product"
                      className="h-14 w-14 rounded border border-slate-300 object-cover dark:border-slate-700"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4 xl:col-span-4">
          <BuilderCanvas
            blocks={blocks}
            selectedBlockId={selectedBlockId}
            onSelectBlock={setSelectedBlockId}
            onDeleteBlock={onDeleteBlock}
            onReorderBlocks={setBlocks}
          />
          <BlockEditor
            block={selectedBlock}
            onUpdateBlock={onUpdateBlock}
            onFocusField={(blockId, field) => setFocusedField({ blockId, field })}
          />
        </div>

        <div className="xl:col-span-5">
          <LivePreview html={effectiveHtml} />
        </div>
      </section>
    </div>
  );
};
