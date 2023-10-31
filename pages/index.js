import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { signOut, useSession } from 'next-auth/react'
import LeftNav from '@/components/LeftNav'

export default function Home() {
  const { data: session, status } = useSession()
  const [x, setX] = useState('')
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    async function f() {
      if (session && session.accessToken) {
        setX(session.accessToken)
        const response = await fetch('https://api.spotify.com/v1/me/playlists', {
          headers: {
            'Authorization': `Bearer ${session.accessToken}`
          }
        })
        const data = await response.json()
        setPlaylists(data.items)
      }
    }
    f()
  }, [session])


  return (
    <main className="pl-80">
      <h1 className="text-6xl font-bold flex text-center">
        hello world, this is the homepage
      </h1>

      <Button variant="destructive" className="ml-4 "
        onClick={() =>
          signOut('spotify', { callbackUrl: "/" }
          )}>
        Log out {session?.user?.name}
      </Button>

      {/*<div className="flex flex-col">
        {playlists.map((playlist) => (
          <div key={playlist.id}>{playlist.name}</div>
        ))}
      </div> */}
    </main >
  )
}

