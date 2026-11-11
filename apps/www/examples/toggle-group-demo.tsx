import { Bold, Italic, List } from "apen-icons"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function ToggleGroupDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-semibold">Alignment</span>
        <ToggleGroup type="single" defaultValue="left" variant="outline" aria-label="Text alignment">
          <ToggleGroupItem value="left" aria-label="Align left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">Right</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-semibold">Formatting</span>
        <ToggleGroup type="multiple" defaultValue={["bold"]} size="sm" aria-label="Text styles">
          <ToggleGroupItem value="bold" aria-label="Bold"><Bold aria-hidden="true" /></ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic"><Italic aria-hidden="true" /></ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List" disabled><List aria-hidden="true" /></ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  )
}
