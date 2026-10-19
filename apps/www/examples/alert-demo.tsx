import { CircleAlert, CircleCheck } from "apen-icons"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AlertDemo() {
  return (
    <div className="grid w-full max-w-lg gap-3">
      <Alert variant="success">
        <CircleCheck />
        <AlertTitle>Payment received</AlertTitle>
        <AlertDescription>Invoice INV-1042 was paid in full.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <CircleAlert />
        <AlertTitle>Sync failed</AlertTitle>
        <AlertDescription>We could not reach the server. Check your connection and try again.</AlertDescription>
      </Alert>
    </div>
  )
}
