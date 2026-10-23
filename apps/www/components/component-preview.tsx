"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ComponentPreview({
  preview,
  code,
  wide = false,
}: {
  preview: React.ReactNode
  code: React.ReactNode
  wide?: boolean
}) {
  return (
    <Tabs defaultValue="preview" className="gap-4">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <div
          className={cn(
            "flex min-h-72 w-full items-center justify-center overflow-hidden rounded-3xl bg-card bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px]",
            wide ? "p-0" : "p-8 sm:p-12"
          )}
        >
          {preview}
        </div>
      </TabsContent>
      <TabsContent value="code">{code}</TabsContent>
    </Tabs>
  )
}
