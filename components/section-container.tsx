import type { ReactNode } from "react"
import { Separator } from "@/components/ui/separator"

interface SectionContainerProps {
  title: string
  children: ReactNode
}

export function SectionContainer({ title, children }: SectionContainerProps) {
  return (
    <div className="p-6 border-b border-slate-100">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">{title}</h2>
      <Separator className="mb-6 bg-slate-200" />
      {children}
    </div>
  )
}

