import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";

const blockLabels = {
  title: "Title",
  imageGallery: "Image Gallery",
  description: "Description",
  specsTable: "Product Specs",
  shippingReturns: "Shipping & Returns"
};

const SortableBlock = ({ block, isSelected, onSelect, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-lg border p-3 ${
        isSelected
          ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
          : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
      }`}
      onClick={() => onSelect(block.id)}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">{blockLabels[block.type] || block.type}</div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
            {...attributes}
            {...listeners}
            aria-label="Drag block"
          >
            <GripVertical size={15} />
          </button>
          <button
            type="button"
            className="rounded p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
            onClick={(event) => {
              event.stopPropagation();
              onDelete(block.id);
            }}
            aria-label="Delete block"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        id: {block.id}
      </p>
    </div>
  );
};

export const BuilderCanvas = ({
  blocks,
  selectedBlockId,
  onSelectBlock,
  onDeleteBlock,
  onReorderBlocks
}) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = blocks.findIndex((block) => block.id === active.id);
    const newIndex = blocks.findIndex((block) => block.id === over.id);
    onReorderBlocks(arrayMove(blocks, oldIndex, newIndex));
  };

  return (
    <div className="panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Builder Canvas</h3>
        <p className="text-xs text-slate-500">{blocks.length} blocks</p>
      </div>

      {!blocks.length && (
        <div className="rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500 dark:border-slate-700">
          Add blocks from the palette to start designing.
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={blocks.map((block) => block.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {blocks.map((block) => (
              <SortableBlock
                key={block.id}
                block={block}
                isSelected={selectedBlockId === block.id}
                onSelect={onSelectBlock}
                onDelete={onDeleteBlock}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
