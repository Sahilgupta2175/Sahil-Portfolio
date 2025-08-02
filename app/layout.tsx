import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sahil Gupta - Full Stack Developer",
  description: "Portfolio of Sahil Gupta, a passionate full-stack developer specializing in modern web technologies.",
  keywords: "Sahil Gupta, Full Stack Developer, React, Node.js, JavaScript, Portfolio",
  authors: [{ name: "Sahil Gupta" }],
  creator: "Sahil Gupta",
  openGraph: {
    title: "Sahil Gupta - Full Stack Developer",
    description: "Portfolio of Sahil Gupta, a passionate full-stack developer specializing in modern web technologies.",
    url: "https://sahilgupta.dev",
    siteName: "Sahil Gupta Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Gupta - Full Stack Developer",
    description: "Portfolio of Sahil Gupta, a passionate full-stack developer specializing in modern web technologies.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
