export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-8 flex flex-col gap-3">
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      {description && <p className="text-lg text-muted-foreground">{description}</p>}
    </div>
  )
}
