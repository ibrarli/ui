import type * as React from "react"

import AlertDemo from "./alert-demo"
import AvatarDemo from "./avatar-demo"
import BadgeDemo from "./badge-demo"
import ButtonDemo from "./button-demo"
import CardDemo from "./card-demo"
import CheckboxDemo from "./checkbox-demo"
import DialogDemo from "./dialog-demo"
import DropdownMenuDemo from "./dropdown-menu-demo"
import InputDemo from "./input-demo"
import LabelDemo from "./label-demo"
import NavbarDemo from "./navbar-demo"
import ProgressDemo from "./progress-demo"
import SelectDemo from "./select-demo"
import SeparatorDemo from "./separator-demo"
import SidebarDemo from "./sidebar-demo"
import SkeletonDemo from "./skeleton-demo"
import StatCardDemo from "./stat-card-demo"
import SwitchDemo from "./switch-demo"
import TableDemo from "./table-demo"
import TabsDemo from "./tabs-demo"
import TextareaDemo from "./textarea-demo"
import TooltipDemo from "./tooltip-demo"

export const examples: Record<string, React.ComponentType> = {
  alert: AlertDemo,
  avatar: AvatarDemo,
  badge: BadgeDemo,
  button: ButtonDemo,
  card: CardDemo,
  checkbox: CheckboxDemo,
  dialog: DialogDemo,
  "dropdown-menu": DropdownMenuDemo,
  input: InputDemo,
  label: LabelDemo,
  navbar: NavbarDemo,
  progress: ProgressDemo,
  select: SelectDemo,
  separator: SeparatorDemo,
  sidebar: SidebarDemo,
  skeleton: SkeletonDemo,
  "stat-card": StatCardDemo,
  switch: SwitchDemo,
  table: TableDemo,
  tabs: TabsDemo,
  textarea: TextareaDemo,
  tooltip: TooltipDemo,
}

/** Examples that need the full preview width. */
export const wideExamples = new Set(["sidebar", "navbar"])
