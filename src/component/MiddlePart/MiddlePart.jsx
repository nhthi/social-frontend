import { Avatar, Card, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Add } from '@mui/icons-material';
import StoryCircle from './StoryCircle';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from '../Post/PostCard';
import { CreatePostModal } from '../CreatePost/CreatePostModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostsAction } from '../../Redux/Post/post.action';



const MiddlePart = () => {
  const story = [1, 1, 1, 1, 1,]
  const post = useSelector(store => store.post)


  const [openCreatePostModal, setOpenCreatePostModal] = React.useState(false);
  const handleOpenCreatePostModal = () => setOpenCreatePostModal(true);
  const handleCloseCreatePostModal = () => setOpenCreatePostModal(false);
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllPostsAction())
  },[post.newComment])
  return (
    <div className='px-20'>
      {/* Story */}
      <section className='flex items-center p-5 rounded-b-md'>
        <div className='flex flex-col items-center mr-4 cursor-pointer'>
          <Avatar
            sx={{ width: '5rem', height: '5rem' }}
          // src="https://www.mobafire.com/images/avatars/lee-sin-muay-thai.png" 
          >
            <AddIcon sx={{ fontSize: '3rem' }} />
          </Avatar>
          <p>New</p>
        </div>
        {story.map((item, index) => <StoryCircle key={index} />)}
      </section>

      <Card className='p-5 mt-5'>
        <div className='flex justify-between'>
          <Avatar />
          <input
            onClick={handleOpenCreatePostModal}
            readOnly
            placeholder='write....'
            type='text'
            className='outline-none w-[90%] rounded-full px-5 bg-transparent border-[#3b4054] border'
          />
        </div>
        <div className="flex justify-center space-x-9 mt-5">
          <div className='flex items-center'>
            <IconButton
              color='primary'
              onClick={handleOpenCreatePostModal}
            >
              <ImageIcon />
            </IconButton>
            <span>Media</span>
          </div>
          <div className='flex items-center'>
            <IconButton color='primary'>
              <VideocamIcon />
            </IconButton>
            <span>Video</span>
          </div>
          <div className='flex items-center'>
            <IconButton color='primary'>
              <ArticleIcon />
            </IconButton>
            <span>Write Article</span>
          </div>
        </div>
      </Card>

      {/* Post card */}
      <div className="mt-5 space-y-5">
        {post.posts.map((item) => <PostCard key={item.id} item={item} />)}
      </div>
      {openCreatePostModal ? <CreatePostModal open={openCreatePostModal} handleClose={handleCloseCreatePostModal}/> : ''}
    </div>
  )
}

export default MiddlePart
