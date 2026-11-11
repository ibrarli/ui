import { Bold, Bookmark, Italic } from "apen-icons"

import { Toggle } from "@/components/ui/toggle"

export default function ToggleDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3" role="group" aria-label="Text formatting controls">
      <Toggle aria-label="Bold" defaultPressed>
        <Bold aria-hidden="true" />
      </Toggle>
      <Toggle aria-label="Italic" variant="outline">
        <Italic aria-hidden="true" />
      </Toggle>
      <Toggle aria-label="Save to favorites" variant="outline">
        <Bookmark aria-hidden="true" /> Save
      </Toggle>
      <Toggle disabled aria-label="Read only">
        Read only
      </Toggle>
    </div>
  )
}
