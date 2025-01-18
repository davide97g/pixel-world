import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/react";
import { BrushIcon } from "lucide-react";
import { useState } from "react";
import { useCreator } from "../context/CreatorProvider";
import { ColorSelectionModal } from "./ColorSelectionModal";

export function MainActionButton() {
  const { setMode } = useCreator();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button
          isIconOnly
          color="danger"
          aria-label="Like"
          className="sticky bottom-2 left-full z-20"
        >
          <BrushIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        variant="flat"
        aria-label="Dropdown menu with shortcut"
        onAction={(key) => {
          if (key === "create") {
            setMode("create");
          } else if (key === "delete") {
            setMode("delete");
          } else if (key === "edit") {
            setMode("edit");
          } else if (key === "color") {
            setIsOpen(true);
          }
        }}
      >
        <DropdownSection title="Pixels">
          <DropdownItem key="create" shortcut="⌘N">
            Color Pixel
          </DropdownItem>
          <DropdownItem key="edit" shortcut="⌘U">
            Edit Pixel
          </DropdownItem>
          <DropdownItem
            key="delete"
            shortcut="⌘⇧D"
            className="text-danger"
            color="danger"
          >
            Clear Pixel
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Colors" showDivider>
          <DropdownItem key="color" shortcut="⌘^C">
            Edit Color
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
      <ColorSelectionModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Dropdown>
  );
}
