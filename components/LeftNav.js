import React from 'react';
import { Button } from './ui/button';
import { AiOutlineHome, AiOutlineSearch, AiOutlineDatabase } from 'react-icons/ai';
import { useSession, s } from 'next-auth/react'
import { useEffect, useState } from 'react';
import Link from 'next/link';

const LeftNav = ({ view, setView, setGlobalPlaylistId }) => {
    const { data: session, status } = useSession()
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        async function f() {
            if (session && session.accessToken) {
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
        <div className="bg-gray-900 h-screen w-64 px-4 py-8 fixed left-0 top-0">
            <div className="flex items-center justify-center mb-8">
                <img
                    src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
                    alt="Spotify Logo"
                    className="h-8"
                />
            </div>
            <nav className=''>
                <ul>
                    <li className="mb-4">
                        <Link href={"/"}>
                            <Button className="bg-gray-700 w-full">
                                <div className="flex items-center">
                                    <AiOutlineHome className='h-5 w-5 mr-4' />
                                    <p className="flex items-center">
                                        Home
                                    </p>
                                </div>
                            </Button>
                        </Link>
                    </li>

                    <li className="mb-4">
                        <Button
                            onClick={() => setView("search")}
                            className="bg-gray-700 w-full">
                            <div className="flex items-center">
                                <AiOutlineSearch className='h-5 w-5 mr-4' />
                                <p className="flex items-center">
                                    Search
                                </p>
                            </div>
                        </Button>
                    </li>
                    <li className="mb-4">
                        <Button
                            onClick={() => setView("library")}
                            className="bg-gray-700 w-full">
                            <div className="flex items-center">
                                <AiOutlineDatabase className='h-5 w-5 mr-4' />
                                <p className="flex items-center">
                                    Your library
                                </p>
                            </div>
                        </Button>
                    </li>
                </ul>
                {
                    playlists.map((playlist) => {
                        return (
                            <div className=' text-neutral-400  border-neutral-900 p-5 text-sm hidden md:inline-flex'>
                                <p
                                    onClick={() => {
                                        setView("playlist")
                                        setGlobalPlaylistId(playlist.id)
                                    }}
                                    key={playlist.id}
                                    className='cursor-default hover:text-white w-52 truncate'
                                >
                                    {playlist.name}
                                </p>
                            </div>
                        )
                    })
                }
            </nav>
        </div>
    );
};

export default LeftNav;
