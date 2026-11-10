import { Progress } from "@/components/ui/progress"

export default function ProgressDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <div className="flex justify-between text-sm">
        <span className="font-semibold">Storage</span>
        <span className="text-muted-foreground">136 of 200 GB</span>
      </div>
      <Progress value={136} max={200} aria-label="Storage" />
    </div>
  )
}
