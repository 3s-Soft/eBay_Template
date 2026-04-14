const styleField = (label, value, onChange, type = "text") => (
  <label className="space-y-1">
    <span className="text-xs font-medium text-slate-500">{label}</span>
    <input
      className="field"
      type={type}
      value={value || ""}
      onChange={(event) => onChange(event.target.value)}
    />
  </label>
);

const textField = (label, value, onChange, onFocus, isTextarea = false) => (
  <label className="space-y-1">
    <span className="text-xs font-medium text-slate-500">{label}</span>
    {isTextarea ? (
      <textarea
        className="field min-h-24"
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
      />
    ) : (
      <input
        className="field"
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
      />
    )}
  </label>
);

export const BlockEditor = ({ block, onUpdateBlock, onFocusField }) => {
  if (!block) {
    return (
      <div className="panel p-4 text-sm text-slate-500">
        Select a block to edit its content and style.
      </div>
    );
  }

  const updateContent = (key, value) => {
    onUpdateBlock(block.id, (current) => ({
      ...current,
      content: {
        ...current.content,
        [key]: value
      }
    }));
  };

  const updateStyle = (key, value) => {
    onUpdateBlock(block.id, (current) => ({
      ...current,
      style: {
        ...current.style,
        [key]: value
      }
    }));
  };

  const rows = Array.isArray(block.content?.rows) ? block.content.rows : [];

  return (
    <div className="space-y-3">
      <div className="panel p-4">
        <h3 className="mb-3 text-sm font-semibold">Block Content</h3>
        <div className="space-y-2">
          {block.type === "title" && (
            <>
              {textField(
                "Title",
                block.content?.text,
                (value) => updateContent("text", value),
                () => onFocusField(block.id, "text")
              )}
              {textField(
                "Subtitle",
                block.content?.subtitle,
                (value) => updateContent("subtitle", value),
                () => onFocusField(block.id, "subtitle")
              )}
            </>
          )}

          {block.type === "imageGallery" &&
            textField(
              "Section Heading",
              block.content?.heading,
              (value) => updateContent("heading", value),
              () => onFocusField(block.id, "heading")
            )}

          {block.type === "description" && (
            <>
              {textField(
                "Section Heading",
                block.content?.title,
                (value) => updateContent("title", value),
                () => onFocusField(block.id, "title")
              )}
              {textField(
                "Description",
                block.content?.body,
                (value) => updateContent("body", value),
                () => onFocusField(block.id, "body"),
                true
              )}
            </>
          )}

          {block.type === "shippingReturns" && (
            <>
              {textField(
                "Shipping",
                block.content?.shipping,
                (value) => updateContent("shipping", value),
                () => onFocusField(block.id, "shipping"),
                true
              )}
              {textField(
                "Returns",
                block.content?.returns,
                (value) => updateContent("returns", value),
                () => onFocusField(block.id, "returns"),
                true
              )}
            </>
          )}

          {block.type === "specsTable" && (
            <div className="space-y-2">
              {rows.map((row, index) => (
                <div key={`${block.id}-row-${index}`} className="rounded border p-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      className="field"
                      placeholder="Label"
                      value={row.key || ""}
                      onChange={(event) => {
                        const nextRows = rows.map((currentRow, currentIndex) =>
                          currentIndex === index
                            ? { ...currentRow, key: event.target.value }
                            : currentRow
                        );
                        updateContent("rows", nextRows);
                      }}
                      onFocus={() => onFocusField(block.id, `rows.${index}.key`)}
                    />
                    <input
                      className="field"
                      placeholder="Value"
                      value={row.value || ""}
                      onChange={(event) => {
                        const nextRows = rows.map((currentRow, currentIndex) =>
                          currentIndex === index
                            ? { ...currentRow, value: event.target.value }
                            : currentRow
                        );
                        updateContent("rows", nextRows);
                      }}
                      onFocus={() => onFocusField(block.id, `rows.${index}.value`)}
                    />
                  </div>
                  <button
                    type="button"
                    className="mt-2 text-xs text-red-600"
                    onClick={() => {
                      const nextRows = rows.filter((_, currentIndex) => currentIndex !== index);
                      updateContent("rows", nextRows);
                    }}
                  >
                    Remove row
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn-secondary w-full"
                onClick={() => updateContent("rows", [...rows, { key: "", value: "" }])}
              >
                Add spec row
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="panel p-4">
        <h3 className="mb-3 text-sm font-semibold">Block Style</h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {styleField("Text Color", block.style?.textColor, (value) =>
            updateStyle("textColor", value)
          )}
          {styleField("Background", block.style?.backgroundColor, (value) =>
            updateStyle("backgroundColor", value)
          )}
          {styleField("Font Family", block.style?.fontFamily, (value) =>
            updateStyle("fontFamily", value)
          )}
          {styleField("Font Size", block.style?.fontSize, (value) =>
            updateStyle("fontSize", value)
          )}
          {styleField("Padding", block.style?.padding, (value) =>
            updateStyle("padding", value)
          )}
          {styleField("Margin", block.style?.margin, (value) =>
            updateStyle("margin", value)
          )}
          {styleField("Border", block.style?.border, (value) =>
            updateStyle("border", value)
          )}
          {styleField("Border Radius", block.style?.borderRadius, (value) =>
            updateStyle("borderRadius", value)
          )}
        </div>
      </div>
    </div>
  );
};
