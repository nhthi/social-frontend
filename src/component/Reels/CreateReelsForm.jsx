import { Avatar, Backdrop, Button, CircularProgress, IconButton } from '@mui/material'
import React, { useState } from 'react'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { uploadToCloundinary } from '../../utils/uploadToCloudniry';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createReelAction } from '../../Redux/Reel/reel.action';
import { useNavigate } from 'react-router-dom';

const CreateReelsForm = () => {
  const dispatch = useDispatch()
  const [selectVideo, setSelectVideo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const formik = useFormik(
    {
      initialValues: {
        title: "",
        video: ""
      },
      onSubmit: (values) => {
        console.log("formik values :", values);
        if (values.video) {
          dispatch(createReelAction(values))
          navigate('/reels')
        }
      }
    }
  )
  const handleSelectVideo = async (event) => {
    setIsLoading(true)
    const videoUrl = await uploadToCloundinary(event.target.files[0], 'video')
    setSelectVideo(videoUrl)
    setIsLoading(false)
    formik.setFieldValue("video", videoUrl)
  }
  return (
    <div className='w-full flex flex-col justify-center space-y-5'>

      <div className='flex space-x-4 items-center'>
        <Avatar />
        <div >
          <p className='font-bold text-lg'>Nguyen Thinh</p>
        </div>
      </div>

      <textarea
        className='w-[60%] outline-none mt-5 border border-slate-300 p-2 bg-transparent border-none overflow-scroll hideScrollBar'
        placeholder='Write caption ...'
        name="title"
        id="title"
        rows='1'
        value={formik.values.title}
        onChange={formik.handleChange}
      >
      </textarea>
      <div className='border border-solid h-[60vh] rounded-md relative'>
        <div>
          <input
            type='file'
            accept='video/*'
            onChange={handleSelectVideo}
            style={{ display: 'none' }}
            id='video-input'
          />
        </div>

        {
          selectVideo ?[

            <video
              key='video'
              className='h-full w-full object-cover'
              src={selectVideo}
              controls
              autoPlay
              loop
              muted
            />,
            <label key='change' htmlFor='video-input' className=''>
              <span  className='absolute top-2.5 left-2.5 bg-primary _select text-primary font-bold py-2 px-4 rounded cursor-pointer hover_button'>Change video</span>
            </label>
          ]
            :
            <label htmlFor='video-input' className='w-full h-full flex flex-col items-center justify-center hover_select'>
              <VideoLibraryIcon sx={{ width: '10rem', height: '10rem' }} />
              <span>Add video</span>
            </label>
        }
      </div>
      <Button sx={{ borderRadius: "20px" }} variant='outlined' onClick={formik.handleSubmit}>Post</Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={()=>setIsLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default CreateReelsForm
