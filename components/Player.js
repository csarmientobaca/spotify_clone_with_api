import React from 'react';
import { CiPause1, CiPlay1 } from 'react-icons/ci';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Player = ({ globalCurrentSongId, setGlobalCurrentSongId, globalIsTrackPlaying, setGlobalIsTrackPlaying }) => {
    const { data: session } = useSession()
    const [songInfo, setSongInfo] = useState(null)

    async function fetchSongInfo(trackId) {
        if (trackId) {
            const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`
                }
            })
            const data = await response.json()
            setSongInfo(data)
        }
    }

    async function getCurrentlyPlaying() {
        const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        })
        if (response.status == 204) {
            console.log("204 response from currently playing")
            return;
        }
        const data = await response.json()
        return data
    }

    async function handlePlayPause() {
        if (session && session.accessToken) {
            const data = await getCurrentlyPlaying()
            if (data.is_playing) {
                console.log(data.is_playing)
                const response = await fetch("https://api.spotify.com/v1/me/player/pause", {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
                    }
                })
                if (response.status == 204) {
                    setGlobalIsTrackPlaying(false)
                }
            } else {
                const response = await fetch("https://api.spotify.com/v1/me/player/play", {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
                    }
                })
                if (response.status == 204) {
                    setGlobalIsTrackPlaying(true)
                    setGlobalCurrentSongId(data.item.id)
                }
            }
        }
    }

    useEffect(() => {
        async function f() {
            if (session && session.accessToken) {
                if (!globalCurrentSongId) {
                    // get the currently playing song from spotify
                    const data = await getCurrentlyPlaying()
                    setGlobalCurrentSongId(data?.item?.id)
                    if (data?.is_playing && !globalIsTrackPlaying) {
                        setGlobalIsTrackPlaying(true)
                    }
                    await fetchSongInfo(data?.item?.id)
                } else {
                    // get song info
                    await fetchSongInfo(globalCurrentSongId)
                }
            }
        }
        f()
    }, [globalCurrentSongId])

    return (
        <>
            <div className=' left-1 h-16 bg-neutral-800 border-t border-neutral-700 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8 fixed bottom-0 w-full'>
                <div className='flex items-center space-x-4'>
                    {songInfo?.album.images[0].url && <img className='hidden md:inline h-10 w-10' src={songInfo.album.images[0].url} />}
                    <div>
                        <p className='text-white text-sm'>{songInfo?.name}</p>
                        <p className='text-neutral-400 text-xs'>{songInfo?.artists[0]?.name}</p>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    {globalIsTrackPlaying ?
                        <CiPause1 onClick={handlePlayPause}
                            className='h-10 w-10' /> : <CiPlay1 onClick={handlePlayPause} className='h-10 w-10' />}
                </div>
            </div>

        </>
    );
}

export default Player;