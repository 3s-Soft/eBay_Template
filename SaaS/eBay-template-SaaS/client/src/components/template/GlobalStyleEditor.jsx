const styleField = (label, value, onChange) => (
  <label className="space-y-1">
    <span className="text-xs font-medium text-slate-500">{label}</span>
    <input
      className="field"
      value={value || ""}
      onChange={(event) => onChange(event.target.value)}
    />
  </label>
);

export const GlobalStyleEditor = ({ globalStyles, onChange }) => {
  const setValue = (key, value) => {
    onChange({
      ...globalStyles,
      [key]: value
    });
  };

  return (
    <div className="panel p-4">
      <h3 className="mb-3 text-sm font-semibold">Global Styles</h3>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {styleField("Font Family", globalStyles.fontFamily, (value) =>
          setValue("fontFamily", value)
        )}
        {styleField("Text Color", globalStyles.textColor, (value) =>
          setValue("textColor", value)
        )}
        {styleField("Background", globalStyles.backgroundColor, (value) =>
          setValue("backgroundColor", value)
        )}
        {styleField("Max Width", globalStyles.maxWidth, (value) =>
          setValue("maxWidth", value)
        )}
      </div>
    </div>
  );
};
