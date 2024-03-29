import { useMenu } from "@/lib/useMenu";
import { Menu, MenuContent, MenuOpenButton } from "./menu/menu";
import { AddHeadingButton } from "./menu/headingButton";
import { AddTextButton } from "./menu/textButton";
import { AddListButton } from "./menu/listButton";

interface InsertMenuProps {
  index: number;
}
export function InsertMenu({ index }: InsertMenuProps) {
  const { isOpen, onClose, onOpen } = useMenu();

  return (
    <Menu onClose={onClose}>
      <MenuOpenButton onOpen={onOpen}>Insert</MenuOpenButton>
      {isOpen ? (
        <MenuContent>
          <AddHeadingButton index={index} />
          <AddTextButton index={index} />
          <AddListButton index={index} />
        </MenuContent>
      ) : null}
    </Menu>
  );
}
