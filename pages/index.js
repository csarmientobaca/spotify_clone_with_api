import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { signOut, useSession } from 'next-auth/react'
import LeftNav from '@/components/LeftNav'
import Image from 'next/image'
import Playlist from '@/components/Playlist'
import Player from '@/components/Player'

export default function Home() {
  const [view, setView] = useState("search") // ["search", "library", "playlist", "artist"]


  const [globalPlaylistId, setGlobalPlaylistId] = useState(null)
  const [globalArtistId, setGlobalArtistId] = useState(null)
  const [globalCurrentSongId, setGlobalCurrentSongId] = useState(null)
  const [globalIsTrackPlaying, setGlobalIsTrackPlaying] = useState(false)


  return (
    <>
      <main className="pl-80">

        {/* <h1 className="text-6xl font-bold flex text-center">
        hello world, this is the homepage
      </h1> */}
        <LeftNav
          view={view}
          setView={setView}
          setGlobalPlaylistId={setGlobalPlaylistId}
        />
        {view === "playlist" &&
          <Playlist
            setView={setView}
            setGlobalArtistId={setGlobalArtistId}
            globalPlaylistId={globalPlaylistId}
            setGlobalCurrentSongId={setGlobalCurrentSongId}
            setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
          />}
        <div className=" ">
          <Player
            globalCurrentSongId={globalCurrentSongId}
            setGlobalCurrentSongId={setGlobalCurrentSongId}
            setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
            globalIsTrackPlaying={globalIsTrackPlaying}
          />
        </div>
      </main >

    </>
  )
}

