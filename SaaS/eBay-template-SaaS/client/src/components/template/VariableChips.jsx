import { TEMPLATE_VARIABLES } from "../../constants/template";

export const VariableChips = ({ onInsert }) => {
  return (
    <div className="panel p-4">
      <h3 className="mb-2 text-sm font-semibold">Dynamic Variables</h3>
      <p className="mb-3 text-xs text-slate-500">
        Click to insert into selected text field.
      </p>
      <div className="flex flex-wrap gap-2">
        {TEMPLATE_VARIABLES.map((variable) => (
          <button
            key={variable}
            type="button"
            className="rounded-full border border-slate-300 px-3 py-1 text-xs hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:hover:bg-blue-950/30"
            onClick={() => onInsert(variable)}
          >
            {variable}
          </button>
        ))}
      </div>
    </div>
  );
};
