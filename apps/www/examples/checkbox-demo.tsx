import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Checkbox id="weekly" defaultChecked />
        <Label htmlFor="weekly">Weekly report</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="alerts" />
        <Label htmlFor="alerts">Usage alerts</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="beta" disabled />
        <Label htmlFor="beta">Beta features</Label>
      </div>
    </div>
  )
}
