import type * as React from "react"

import AccordionDemo from "./accordion-demo"
import AlertDemo from "./alert-demo"
import AvatarDemo from "./avatar-demo"
import BadgeDemo from "./badge-demo"
import ButtonDemo from "./button-demo"
import BreadcrumbDemo from "./breadcrumb-demo"
import CardDemo from "./card-demo"
import CheckboxDemo from "./checkbox-demo"
import CollapsibleDemo from "./collapsible-demo"
import DialogDemo from "./dialog-demo"
import DropdownMenuDemo from "./dropdown-menu-demo"
import InputDemo from "./input-demo"
import LabelDemo from "./label-demo"
import NavbarDemo from "./navbar-demo"
import PaginationDemo from "./pagination-demo"
import PopoverDemo from "./popover-demo"
import ProgressDemo from "./progress-demo"
import RadioGroupDemo from "./radio-group-demo"
import SelectDemo from "./select-demo"
import SeparatorDemo from "./separator-demo"
import SidebarDemo from "./sidebar-demo"
import SkeletonDemo from "./skeleton-demo"
import SliderDemo from "./slider-demo"
import StatCardDemo from "./stat-card-demo"
import SwitchDemo from "./switch-demo"
import TableDemo from "./table-demo"
import TabsDemo from "./tabs-demo"
import TextareaDemo from "./textarea-demo"
import ToggleDemo from "./toggle-demo"
import ToggleGroupDemo from "./toggle-group-demo"
import TooltipDemo from "./tooltip-demo"

export const examples: Record<string, React.ComponentType> = {
  accordion: AccordionDemo,
  alert: AlertDemo,
  avatar: AvatarDemo,
  badge: BadgeDemo,
  button: ButtonDemo,
  breadcrumb: BreadcrumbDemo,
  card: CardDemo,
  checkbox: CheckboxDemo,
  collapsible: CollapsibleDemo,
  dialog: DialogDemo,
  "dropdown-menu": DropdownMenuDemo,
  input: InputDemo,
  label: LabelDemo,
  navbar: NavbarDemo,
  pagination: PaginationDemo,
  popover: PopoverDemo,
  progress: ProgressDemo,
  "radio-group": RadioGroupDemo,
  select: SelectDemo,
  separator: SeparatorDemo,
  sidebar: SidebarDemo,
  skeleton: SkeletonDemo,
  slider: SliderDemo,
  "stat-card": StatCardDemo,
  switch: SwitchDemo,
  table: TableDemo,
  tabs: TabsDemo,
  textarea: TextareaDemo,
  toggle: ToggleDemo,
  "toggle-group": ToggleGroupDemo,
  tooltip: TooltipDemo,
}

/** Examples that need the full preview width. */
export const wideExamples = new Set(["sidebar", "navbar"])
