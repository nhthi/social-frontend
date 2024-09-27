
import { Card, Grid } from "@mui/material";
import React from "react";
import Login from "./Login";
import Register from "./Register";
import { Route, Routes } from "react-router-dom";

const Authentication = () => {
    return (
        <div style={{ backgroundColor: '#432002' }}>
            <Grid container>
                <Grid className="h-screen overflow-hidden" item xs={7}>
                    <img className="h-full w-full" src="https://1.bp.blogspot.com/-VjwITT_pldI/XGzUQ5LeoSI/AAAAAAAADI8/rJ4zgwOctJcS5uy0-4EQ9pNItlPwZhybQCLcBGAs/s1600/anh-hinh-nen-yasu-hd-dep-nhat.png" alt="" />
                </Grid>
                <Grid item xs={5}>
                    <div className="px-20 flex flex-col justify-center h-full">
                        <Card className="card p-8">
                            <div className="flex flex-col items-center mb-5 space-y-1">
                                <h1 className="logo text-center">NHT Social</h1>
                                <p className="text-center text-sm w-[70&]">Connecting Lives, Sharing Sotries: Your Social Word, Your Way</p>
                            </div>
                            <Routes>
                                <Route path="/*" element={<Login />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                            </Routes>
                        </Card>

                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Authentication