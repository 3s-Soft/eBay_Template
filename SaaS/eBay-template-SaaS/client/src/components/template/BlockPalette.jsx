import { BLOCK_DEFAULTS } from "../../constants/template";

const labels = {
  title: "Title",
  imageGallery: "Image Gallery",
  description: "Description",
  specsTable: "Specs Table",
  shippingReturns: "Shipping & Returns"
};

export const BlockPalette = ({ onAddBlock }) => {
  return (
    <div className="panel p-4">
      <h3 className="mb-3 text-sm font-semibold">Block Palette</h3>
      <div className="space-y-2">
        {Object.keys(BLOCK_DEFAULTS).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => onAddBlock(key)}
            className="w-full rounded-lg border border-dashed border-slate-300 px-3 py-2 text-left text-sm hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:hover:bg-blue-950/20"
          >
            + {labels[key]}
          </button>
        ))}
      </div>
    </div>
  );
};
