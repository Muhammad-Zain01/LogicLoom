import { useDroppable } from "@dnd-kit/core";

type ComponentProps = {
  children: React.ReactNode;
  id: string;
};

const DropableZone: React.FC<ComponentProps> = ({ id, children }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        padding: "8px",
        border: "2px dashed gray",
        marginBottom: "4px",
        backgroundColor: isOver ? "#f0f0f0" : "transparent",
      }}
    >
      {children}
    </div>
  );
};

export default DropableZone;
