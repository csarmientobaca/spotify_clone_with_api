import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Music from './Music';

const Playlist = ({ globalPlaylistId, setGlobalCurrentSongId, setGlobalIsTrackPlaying, setView, setGlobalArtistId }) => {
    const { data: session } = useSession()
    const [playlistData, setPlaylistData] = useState(null)


    useEffect(() => {
        async function f() {
            if (session && session.accessToken) {
                const response = await fetch(`https://api.spotify.com/v1/playlists/${globalPlaylistId}`, {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
                    }
                })
                const data = await response.json()
                setPlaylistData(data)
            }
        }
        f()
    }, [session, globalPlaylistId])


    return (
        <div className='flex-grow h-screen'>
            <header >
                <div >
                    {playlistData && <img className='h-8 w-8 mr-6' src={playlistData.images[0].url} />}
                    <p>{playlistData?.name}</p>
                </div>
            </header>
            <div
                onClick={() => signOut()} className='absolute z-20 top-5 right-8 flex items-center bg-black bg-opacity-70 text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
                <img className='rounded-full w-7 h-7'
                    src={session?.user.image} alt="profile pic" />
                <p className='text-sm'>Logout</p>
            </div>


            <div className='relative -top-20 h-screen overflow-y-scroll bg-neutral-900'>
                <section className={`flex items-end space-x-7 bg-gradient-to-b to-neutral-900  h-80 text-white p-8`}>
                    {playlistData && <img className='h-44 w-44' src={playlistData.images[0].url} />}
                    <div>
                        <p className='text-sm font-bold'>Playlist</p>
                        <h1 className='text-2xl md:text-3xl lg:text-5xl font-extrabold'>{playlistData?.name}</h1>
                    </div>
                </section>
                <div className='text-white px-8 flex flex-col space-y-1 pb-28'>
                    {playlistData?.tracks?.items?.map((track, i) => {
                        return (
                            <Music
                                setView={setView}
                                setGlobalArtistId={setGlobalArtistId}
                                setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
                                setGlobalCurrentSongId={setGlobalCurrentSongId}
                                key={track?.track.id}
                                sno={i}
                                track={track?.track}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
export default Playlist;
