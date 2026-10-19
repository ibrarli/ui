import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy a new workspace in one click.</CardDescription>
        <CardAction>
          <Button variant="link" size="sm" className="px-0">
            Docs
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Label htmlFor="project">Name</Label>
        <Input id="project" placeholder="apen-dashboard" />
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant="ghost">Cancel</Button>
        <Button>Create</Button>
      </CardFooter>
    </Card>
  )
}
