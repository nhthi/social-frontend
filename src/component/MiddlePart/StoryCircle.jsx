import { Avatar } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Add } from '@mui/icons-material';

const StoryCircle = () => {
    return (
        <div className='flex flex-col items-center mr-4 cursor-pointer'>
            <Avatar
                sx={{ width: '5rem', height: '5rem' }}
                src="https://www.mobafire.com/images/avatars/lee-sin-muay-thai.png"
            >
            </Avatar>
            <p>New</p>
        </div>
    )
}

export default StoryCircle
