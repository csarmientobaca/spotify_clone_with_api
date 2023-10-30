import React from 'react'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="pl-80"> {/* Add left padding */}
      <h1 className="text-6xl font-bold flex text-center">
        hello world, this is the homepage
        <Button className="ml-4">Button</Button>
      </h1>
    </main>
  )
}

