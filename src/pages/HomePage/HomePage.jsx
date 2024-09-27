import { Grid } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom"
import MiddlePart from "../../component/MiddlePart/MiddlePart"
import Reels from "../../component/Reels/Reels"
import CreateReelsForm from "../../component/Reels/CreateReelsForm"
import Profile from "../Profile/Profile"
import HomeRight from "../../component/HomeRight/HomeRight"
import SideBar from "../../component/Sidebar/SideBar"
import { useDispatch, useSelector } from "react-redux"
import Authentication from "../Authentication/Authentication"
import { getAllPostsAction } from "../../Redux/Post/post.action"


const HomePage = () => {
    const location = useLocation()
    const auth = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const jwt = localStorage.getItem('jwt')
    
    return (
        <div className="px-20">
            <Grid container spacing={0}>
                <Grid item xs={0} lg={3}>
                    <div className="sticky top-0">
                        <SideBar/>
                    </div>
                </Grid>
                <Grid 
                    item
                    lg={location.pathname === '/' ? 6 : 9}
                    className="px-5 flex justify-center"
                    xs={12}
                >
                    <Routes>
                        <Route path="/" element={auth.user ? <MiddlePart /> : <Authentication/>} />
                        <Route path="/reels" element={<Reels />} />
                        <Route path="/create-reels" element={<CreateReelsForm />} />
                        <Route path="/profile/:id" element={auth.user ? <Profile /> : <Authentication/>} />
                    </Routes>
                </Grid>
                {location.pathname === '/' && <Grid item lg={3} className="relative">
                    <div className="sticky top-0 w-full">
                        <HomeRight/>
                    </div>
                </Grid>}
            </Grid>

        </div>
    )
}
export default HomePage