import { Separator } from "@/components/ui/separator"

export default function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm">
      <h4 className="font-bold">Apen UI</h4>
      <p className="text-sm text-muted-foreground">Rounded components for dashboards.</p>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Components</span>
        <Separator orientation="vertical" />
        <span>Dashboard</span>
      </div>
    </div>
  )
}
