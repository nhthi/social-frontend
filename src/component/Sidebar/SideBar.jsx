import React, { useState } from "react"
import { navigationMenu } from "./SidebarNavigation"
import { Avatar, Button, Card, Divider, Menu, MenuItem } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUserAction } from "../../Redux/Auth/auth.action";
const SideBar = () => {

    const auth = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleNavigate = (item) => {
        if (item.title === 'Profile') {
            navigate(`/profile/${auth.user?.id}`)
        } else {
            navigate(item.path)
        }
    }

    const menu = navigationMenu.map((item) =>
        <div
            onClick={() => handleNavigate(item)}
            key={item.title}
            className="cursor-pointer flex space-x-3 items-center"
        >
            {item.icon}
            <p className="text-xl">{item.title}</p>
        </div>
    )


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        console.log('Log out');
        dispatch(logoutUserAction())
        navigate('/')
    }
    return (
        <Card className="card h-screen flex flex-col justify-between py-5">
            <div className="space-y-8 pl-5">
                <div className="">
                    <span className="logo font-bold text-xl">Code with Thinh</span>
                </div>
                <div className="space-y-8">
                    {menu}
                </div>
                <Divider />
                <div className="pl-5 flex items-center justify-between pt-5">
                    <div className="flex items-center space-x-3">
                        <Avatar src={auth.user?.avatar ? auth.user.avatar : "https://www.w3schools.com/howto/img_avatar.png"} />
                        <div>
                            <p className="font-bold">{auth.user?.firstName + " " + auth.user?.lastName}</p>
                            <p className="opacity-70">@{auth.user?.firstName?.toLowerCase() + "" + auth.user?.lastName?.toLowerCase()}</p>
                        </div>
                    </div>
                    <div>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem
                                onClick={() => {
                                    navigate(`/profile/${auth.user.id}`)
                                    handleClose()
                                }}
                            >Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
        </Card>
    )
}
export default SideBar