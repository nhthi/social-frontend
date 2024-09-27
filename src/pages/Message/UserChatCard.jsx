import { Avatar, Card, CardHeader, IconButton } from '@mui/material'
import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector } from 'react-redux';

const UserChatCard = ({chat}) => {
    const auth = useSelector(store => store.auth)
    return (
        <div>
            <Card>
                <CardHeader
                    // onClick={() => { handleClick() }}
                    action={
                        <IconButton aria-label="settings">
                            <MoreHorizIcon/>
                        </IconButton>
                    }
                    avatar={
                        <Avatar
                            sx={{ width: '3.5rem', height: '3.5rem', fontSize: '1.5rem', bgcolor: '#191c29', color: 'rgb(88,199,250)' }}
                            src='https://cdn.wallpapersafari.com/70/5/9RczN4.jpg'
                        />
                    }
                    titleTypographyProps={{ style: { textAlign: 'left' } }}
                    subheaderTypographyProps={{ style: { textAlign: 'left' } }}
                    title={auth.user?.id===chat?.users[0]?.id?chat?.users[1].lastName + " "+chat?.users[1].firstName : 
                        chat.users[0].lastName + " "+chat.users[0].firstName
                    }
                    subheader={'New Messgae'}
                />
            </Card>
        </div>
    )
}

export default UserChatCard
