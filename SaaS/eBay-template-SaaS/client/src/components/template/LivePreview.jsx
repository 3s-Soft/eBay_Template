export const LivePreview = ({ html }) => {
  return (
    <div className="panel h-full p-4">
      <h3 className="mb-3 text-sm font-semibold">Live Preview</h3>
      <iframe
        title="eBay HTML preview"
        srcDoc={html}
        className="h-[600px] w-full rounded border border-slate-200 bg-white dark:border-slate-700"
      />
    </div>
  );
};
