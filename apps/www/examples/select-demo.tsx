import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select a range" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Date range</SelectLabel>
          <SelectItem value="7d">Last 7 days</SelectItem>
          <SelectItem value="30d">Last 30 days</SelectItem>
          <SelectItem value="90d">Last 3 months</SelectItem>
          <SelectItem value="1y">Last year</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
