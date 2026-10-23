import { ArrowRight, Plus, Trash } from "apen-icons"

import { Button } from "@/components/ui/button"

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>
        <Plus /> New project
      </Button>
      <Button variant="brand">
        Get started <ArrowRight />
      </Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondary">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive" size="icon" aria-label="Delete">
        <Trash />
      </Button>
    </div>
  )
}
