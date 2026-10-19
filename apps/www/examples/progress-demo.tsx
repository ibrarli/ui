import { Progress } from "@/components/ui/progress"

export default function ProgressDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <div className="flex justify-between text-sm">
        <span className="font-semibold">Storage</span>
        <span className="text-muted-foreground">68 of 100 GB</span>
      </div>
      <Progress value={68} />
    </div>
  )
}
