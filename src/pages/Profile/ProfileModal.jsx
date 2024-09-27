import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileAction } from '../../Redux/Auth/auth.action';
import { Avatar, Backdrop, CircularProgress, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { uploadToCloundinary } from '../../utils/uploadToCloudniry';
import { useEffect } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
  outline: 'none',
  overFlow: 'scroll-y',
  borderRadius: 3
};

export default function ProfileModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const auth = useSelector(store => store.auth)
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      firstName: auth.user.firstName ? auth.user.firstName : '',
      lastName: auth.user.lastName ? auth.user.lastName : '',
      avatar: auth.user.avatar || ''
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(updateProfileAction(values))
      handleClose()
    }
  })
  const handleSelectAvatar = async (e) => {
    setLoading(true)
    const imgUrl = await uploadToCloundinary(e.target.files[0], 'image')
    formik.setFieldValue('avatar',imgUrl)
    setLoading(false)
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className='flex justify-between items-center'>
              <div className='flex space-x-3 items-center'>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
                <p>
                  EDIT PROFILE
                </p>
              </div>
              <Button type='submit'>Save</Button>
            </div>
            <div>
              <div className="h-[15rem]">
                <img
                  className='w-full h-full rounded-t-md'
                  src={auth.user?.background ? auth.user?.background : 'https://cdn.oneesports.vn/cdn-data/wp-content/uploads/sites/4/2020/10/leesin.jpg'}
                  alt=''
                />
              </div>
              <input
                type='file'
                accept='image/*'
                onChange={handleSelectAvatar}
                style={{ display: 'none' }}
                id='image-input'
              />
              <label htmlFor='image-input'>
                <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
                  <Avatar
                    className='transform -translate-y-24'
                    sx={{ width: "10rem", height: "10rem" }}
                    src={formik.values.avatar ? formik.values.avatar : 'https://cdn.oneesports.vn/cdn-data/wp-content/uploads/sites/4/2020/10/leesin.jpg'}
                  />
                </div>
              </label>

            </div>
            <div className='space-y-3'>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                variant="outlined"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                variant="outlined"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
            </div>
          </form>
          {loading && <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>}
        </Box>
      </Modal>
    </div>
  );
}