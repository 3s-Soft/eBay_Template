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
  const selectField = (label, value, onChange, options) => (
    <label className="space-y-1">
      <span className="text-xs font-medium text-slate-500">{label}</span>
      <select
        className="field"
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );

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

          {block.type === "rating" && (
            <>
              {textField(
                "Rating (1-5)",
                block.content?.rating,
                (value) => updateContent("rating", value),
                () => onFocusField(block.id, "rating")
              )}
              {textField(
                "Review Count",
                block.content?.reviewCount,
                (value) => updateContent("reviewCount", value),
                () => onFocusField(block.id, "reviewCount")
              )}
            </>
          )}

          {block.type === "socialProof" && (
            <div className="space-y-2">
              {(block.content?.items || []).map((item, index) => (
                <div key={`${block.id}-item-${index}`} className="rounded border p-2">
                  <input
                    className="field mb-2"
                    placeholder="Stat (e.g., 1000+)"
                    value={item.stat || ""}
                    onChange={(event) => {
                      const items = [...(block.content?.items || [])];
                      items[index] = { ...items[index], stat: event.target.value };
                      updateContent("items", items);
                    }}
                  />
                  <input
                    className="field"
                    placeholder="Label (e.g., Sold)"
                    value={item.label || ""}
                    onChange={(event) => {
                      const items = [...(block.content?.items || [])];
                      items[index] = { ...items[index], label: event.target.value };
                      updateContent("items", items);
                    }}
                  />
                  <button
                    type="button"
                    className="mt-2 text-xs text-red-600"
                    onClick={() => {
                      const items = (block.content?.items || []).filter((_, i) => i !== index);
                      updateContent("items", items);
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn-secondary w-full"
                onClick={() => {
                  updateContent("items", [...(block.content?.items || []), { stat: "", label: "" }]);
                }}
              >
                Add proof item
              </button>
            </div>
          )}

          {block.type === "testimonial" && (
            <>
              {textField(
                "Quote",
                block.content?.quote,
                (value) => updateContent("quote", value),
                () => onFocusField(block.id, "quote"),
                true
              )}
              {textField(
                "Author",
                block.content?.author,
                (value) => updateContent("author", value),
                () => onFocusField(block.id, "author")
              )}
            </>
          )}

          {block.type === "cta" && (
            <>
              {textField(
                "Heading",
                block.content?.text,
                (value) => updateContent("text", value),
                () => onFocusField(block.id, "text")
              )}
              {textField(
                "Button Text",
                block.content?.buttonText,
                (value) => updateContent("buttonText", value),
                () => onFocusField(block.id, "buttonText")
              )}
            </>
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
          
          {/* Advanced styling options */}
          {selectField(
            "Font Weight",
            block.style?.fontWeight,
            (value) => updateStyle("fontWeight", value),
            [
              { value: "normal", label: "Normal" },
              { value: "bold", label: "Bold" },
              { value: "300", label: "Light" },
              { value: "600", label: "Semi-bold" }
            ]
          )}
          
          {styleField("Line Height", block.style?.lineHeight, (value) =>
            updateStyle("lineHeight", value)
          )}
          
          {selectField(
            "Text Align",
            block.style?.textAlign,
            (value) => updateStyle("textAlign", value),
            [
              { value: "left", label: "Left" },
              { value: "center", label: "Center" },
              { value: "right", label: "Right" }
            ]
          )}
          
          {styleField("Box Shadow", block.style?.boxShadow, (value) =>
            updateStyle("boxShadow", value)
          )}
          
          {styleField("Opacity", block.style?.opacity, (value) =>
            updateStyle("opacity", value)
          )}
          
          {styleField("Transform", block.style?.transform, (value) =>
            updateStyle("transform", value)
          )}
          
          {styleField("Transition", block.style?.transition, (value) =>
            updateStyle("transition", value)
          )}
        </div>
      </div>
    </div>
  );
};
