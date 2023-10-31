import React from 'react';

const LeftNav = () => {
    return (
        <div className="bg-gray-900 h-screen w-64 px-4 py-8 fixed left-0 top-0">
            <div className="flex items-center justify-center mb-8">
                <img
                    src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
                    alt="Spotify Logo"
                    className="h-8"
                />
            </div>
            <nav>
                <ul>
                    <li className="mb-4">
                        <a href="#" className="text-gray-400 hover:text-white">
                            Home
                        </a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="text-gray-400 hover:text-white">
                            Search
                        </a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="text-gray-400 hover:text-white">
                            Your Library
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default LeftNav;
