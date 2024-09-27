import { Avatar, Box, Button, Card, Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import PostCard from '../../component/Post/PostCard'
import UserReelsCard from '../../component/Reels/UserReelsCard'
import { useDispatch, useSelector } from 'react-redux'
import ProfileModal from './ProfileModal'
import { getUSerPostAction } from '../../Redux/Post/post.action'
import { followAction, getFollowerAction, getFollowingAction, getProfileByUserIdAction } from '../../Redux/Auth/auth.action'
import { getUserReelAction } from '../../Redux/Reel/reel.action'


const tabs = [
  {
    name: 'Post',
    value: 'post'
  },
  {
    name: 'Reels',
    value: 'reels'
  },
  {
    name: 'Saved',
    value: 'saved'
  },
  {
    name: 'RePost',
    value: 'repost'
  },
]
const saved = [1, 1, 1, 1, 1]
const reposts = [1, 1, 1, 1, 1]
const reels = [1, 1, 1, 1, 1]

const Profile = () => {
  // profile modal
  const [open, setOpen] = React.useState(false);
  const handleOpenProfileModal = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // 
  const post = useSelector(store => store.post)
  const dispatch = useDispatch()
  const auth = useSelector(store => store.auth)
  const reel = useSelector(store => store.reel)
  const location = useLocation()
  const { id } = useParams()
  const followed = auth.followers.some(item=>item.id===auth.user.id)
  const [isFollowed,setFollowed] = useState(false)
  const [value, setValue] = React.useState('post');
  const userProfile = auth.user.id == id ? auth.user : auth.userExplore
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  useEffect(()=>{
    setFollowed(followed)
  },[followed])
  useEffect(()=>{
    dispatch(getFollowerAction(id))
    dispatch(getFollowingAction(id))
    dispatch(getUserReelAction(id))
    dispatch(getProfileByUserIdAction(id))
  },[id])
  useEffect(() => {
    dispatch(getUSerPostAction(id))
  },[id,post.newComment])

  const handleFollow = ()=>{
    setFollowed(pre=>!pre)
    dispatch(followAction(auth.user.id,id))
  }
  return (
    <Card className='my-10 w-[70%]'>
      <div className="rounded-md">
        <div className="h-[15rem]">
          <img
            className='w-full h-full rounded-t-md'
            src={userProfile?.background ? userProfile?.background : 'https://marketplace.canva.com/EAE8yuYZRpo/1/0/1600w/canva-cam-v%C3%A0-xanh-l%C3%A1-khu-r%E1%BB%ABng-%E1%BA%A3nh-b%C3%ACa-facebook-m%C3%B9a-thu-hGIvF_HcwGE.jpg'}
            alt=''
          />
        </div>
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar className='transform -translate-y-24' sx={{ width: "10rem", height: "10rem" }} src={userProfile?.avatar ? userProfile.avatar : ''} />
          {auth.user.id == id ? <Button sx={{ borderRadius: "20px" }} variant='outlined' onClick={handleOpenProfileModal}>Eidt Profile</Button> :
            <Button sx={{ borderRadius: "20px" }} variant='outlined' onClick={handleFollow}>{isFollowed ? 'Unfollow' : 'Follow'}</Button>}
        </div>

        <div className='p-5'>
          <div className='flex flex-col items-start'>
            <h1 className='py-1 font-bold text-xl'>{userProfile?.lastName + " " + userProfile?.firstName}</h1>
            <p>@{userProfile?.firstName.toLowerCase() + "" + userProfile?.lastName.toLowerCase()}</p>
          </div>
          <div className='flex gap-4 items-center py-3'>
            <span>{post.posts.length} post</span>
            <span>{auth.followers.length} followers</span>
            <span>{auth.followings.length} followings</span>
          </div>

          <div className='flex'>
            <p>Tôi tên Thịnh học ở Đại học Cần Thơ, có người iu tên Kha Ngọc Bảo Thư</p>
          </div>
        </div>

        <section>
          <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              // textColor="secondary"
              // indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              {tabs.map((item) =>
                <Tab sx={{ fontWeight: 700 }} key={item.name} value={item.value} label={item.name} wrapped />)}
            </Tabs>
          </Box>
          <div className='flex justify-center'>
            {
              value === 'post' ?
                <div className="mt-5 space-y-5">
                  {post.posts.map((item, index) => <PostCard key={item.id} item={item} />)}
                </div> :
                value === 'saved' ?
                  <div className='space-y-5 w-[70%] my-10'>
                    {saved.map((item, index) =>
                      <div className='border border-slate-100 rounded-md'>
                        <PostCard />
                      </div>)}
                  </div> :
                  value === 'repost' ?
                    <div className='space-y-5 w-[70%] my-10'>
                      {reposts.map((item, index) =>
                        <div className='border border-slate-100 rounded-md'>
                          <PostCard />
                        </div>)}
                    </div> :
                    value === 'reels' ?
                      <div className='flex flex-wrap justify-center gap-2 my-10'>
                        {
                          reel.reels.map((item) => <UserReelsCard key={item.id} item={item} path={location.pathname} />)
                        }
                      </div>
                      : ""
            }
          </div>
        </section>
      </div>
      <div>
        <section>
          <ProfileModal open={open} handleClose={handleClose} />
        </section>
      </div>
    </Card>
  )
}

export default Profile
