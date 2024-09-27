import { Avatar } from '@mui/material'
import React, { useEffect, useRef } from 'react'

const UserReelsCard = ({ item, path }) => {
    const videoRef = useRef(null);
    useEffect(() => {
        const video = videoRef.current;
        const handleCanPlay = () => {
            video.muted = false;
            // Bật âm thanh khi video có thể phát
        };
        video.addEventListener('onplay', handleCanPlay);

        return () => {
            video.removeEventListener('onplay', handleCanPlay);
        };
    }, [])
    return (
        <div className={path === '/reels' ? 'user-reels-card relative' : 'w-[15rem] px-2 relative'}>
            {
                path === '/reels' && [
                <div className='absolute top-2 left-2 flex items-center space-x-2' key='avatar'>
                    <Avatar sx={{ width: 50, height: 50 }} src={item.user.avatar} />
                    <span className='font-bold text-white'>{`${item.user.lastName} ${item.user.firstName}`}</span>
                </div>,
                <span key='title' className='absolute left-4 bottom-6 text-white w-[60%] text-left'>{item.title}</span>
                ]

                
            }
            <video
                ref={videoRef}
                className='h-full w-full object-cover'
                src={item.video}
                controls
                autoPlay={path === '/reels'}
                loop
                muted
            />
        </div>
    )
}

export default UserReelsCard
