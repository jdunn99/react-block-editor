import { useMenu } from "@/lib/useMenu";
import { Menu, MenuContent, MenuOpenButton } from "./menu/menu";
import { useEditorContext } from "@/lib/useEditorContext";
import React from "react";
import { BlockType } from "@/store/blockSlice";
import { UpdateHeadingButtons } from "./menu/headingButton";

function EditInternalButtons({ index }: Pick<EditMenuProps, "index">) {
  const deleteBlock = useEditorContext((state) => state.deleteBlock);
  const changeBlockOrder = useEditorContext((state) => state.changeBlockOrder);
  const size = useEditorContext((state) => state.size);

  function onDelete() {
    if (index !== 0) {
      deleteBlock(index);
    }
  }

  function moveUp() {
    if (index !== 0) {
      changeBlockOrder(index, index - 1);
    }
  }

  function moveDown() {
    if (index !== size() - 1) {
      changeBlockOrder(index, index + 1);
    }
  }

  return (
    <React.Fragment>
      <li onClick={moveUp}>Move Up</li>
      <li onClick={moveDown}>Move Down</li>
      <li onClick={onDelete}>Delete</li>
    </React.Fragment>
  );
}

function ChangeBlockTypeButton({
  index,
  type,
  children,
}: EditMenuProps & {
  children?: React.ReactNode;
}) {
  const changeBlockType = useEditorContext((state) => state.changeBlockType);

  return <li onClick={() => changeBlockType(index, type)}>{children}</li>;
}

interface EditMenuProps {
  index: number;
  type: BlockType;
}
export function EditMenu({ index, type }: EditMenuProps) {
  const { isOpen, onClose, onOpen } = useMenu();

  function Buttons() {
    switch (type) {
      case "heading": {
        return (
          <React.Fragment>
            <UpdateHeadingButtons index={index} />
            <ChangeBlockTypeButton index={index} type="text">
              Text
            </ChangeBlockTypeButton>
          </React.Fragment>
        );
      }
      case "text": {
        return (
          <React.Fragment>
            <ChangeBlockTypeButton index={index} type="heading">
              Heading
            </ChangeBlockTypeButton>
          </React.Fragment>
        );
      }
    }
  }

  return (
    <Menu onClose={onClose}>
      <MenuOpenButton onOpen={onOpen}>Edit</MenuOpenButton>
      {isOpen ? (
        <MenuContent>
          <EditInternalButtons index={index} />
          <Buttons />
        </MenuContent>
      ) : null}
    </Menu>
  );
}
