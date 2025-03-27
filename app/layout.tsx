import type React from "react"
import { Toaster } from "@/components/toaster"
import "@/app/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
  generator: 'v0.dev'
};
