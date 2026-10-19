import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/ibrarli.png" alt="@ibrarli" />
        <AvatarFallback>IA</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-brand-gradient text-white">AA</AvatarFallback>
      </Avatar>
      <div className="flex -space-x-3">
        {["SK", "MR", "JT"].map((initials) => (
          <Avatar key={initials} className="ring-4 ring-background">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        ))}
      </div>
    </div>
  )
}
