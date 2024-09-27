import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Input, Menu, MenuItem, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ExpandMore } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, deletePostAction, getAllPostsAction, likePostAction } from '../../Redux/Post/post.action';
import { isLikePost } from '../../utils/isLikedPost';


const PostCard = ({ item }) => {
    const auth = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const [showComments, setShowComments] = useState(false)
    const [commentValue, setCommentValue] = useState('')
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDialog, setOpenDialog] = useState(false);



    const handleShowComments = () => setShowComments(!showComments)

    const handleCreateComment = (contentComment) => {
        const reqData = {
            postId: item.id,
            commentData: {
                content: contentComment
            }
        }
        dispatch(createCommentAction(reqData));
    }

    const handleLikePost = () => {
        dispatch(likePostAction(item.id))
    }
    const date = new Date(item.createdAt)

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDeletePost = () => {
        console.log("delete post");
        dispatch(deletePostAction(item.id))
        handleCloseDialog();
    };
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <div>
                        <IconButton
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {item.user.id === auth.user.id ?

                                [<MenuItem key='delete' onClick={handleOpenDialog}>Delete</MenuItem>,
                                <MenuItem key='edit' >Edit</MenuItem>]
                                :
                                [
                                    <MenuItem key='report'>Report</MenuItem>
                                ]
                            }
                        </Menu>
                    </div>

                }
                titleTypographyProps={{ style: { textAlign: 'left' } }}
                subheaderTypographyProps={{ style: { textAlign: 'left' } }}

                title={item.user?.firstName + " " + item.user?.lastName}
                // subheader={`@${item.user?.lastName.toLowerCase()}${item.user?.firstName.toLowerCase()}`}
                subheader={`${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`}
            />
            {item.image &&
                <CardMedia
                    component="img"
                    style={{ maxHeight: 500, width: '100%' }}
                    image={item.image}
                    alt="Paella dish"
                />}
            <CardContent>
                <Typography variant="body2" color="text.secondary" style={{ textAlign: 'left' }}>
                    {item.caption}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className='flex justify-between'>
                <div>
                    <IconButton onClick={handleLikePost}>
                        {isLikePost(auth.user.id, item) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>

                    <IconButton>
                        {<ShareIcon />}
                    </IconButton>

                    <IconButton onClick={handleShowComments}>
                        {<ChatBubbleIcon />}
                    </IconButton>
                </div>
                <div>
                    <IconButton>
                        {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                </div>
            </CardActions>
            {showComments && <section>
                <div className='item flex items-center space-x-5 mx-3 my-5 '>
                    <Avatar sx={{}} />
                    <input
                        value={commentValue}
                        onChange={(e) => setCommentValue(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                if (e.target.value.length > 0) {
                                    handleCreateComment(e.target.value)
                                    setCommentValue('')
                                }
                            }
                        }}
                        type='text'
                        placeholder='write your comment...'
                        className='w-full outline-none border border-[#3b4054] bg-transparent rounded-full px-5 py-2' />
                </div>
                <Divider />
                <div className='mx-3 space-y-2 my-5 text-xs'>
                    {item.comments.map((comment) =>
                        <div key={comment.id} className='flex items-center space-x-3'>
                            <Avatar sx={{ height: '2rem', width: '2rem', fontSize: '.8rem' }} >
                                {comment.user.firstName[0]}
                            </Avatar>

                            <div className='flex flex-col items-start'>
                                <span className='text-sm font-bold'>
                                    {comment.user.lastName + " " + comment.user.firstName}
                                </span>
                                <p>
                                    {comment.content}
                                </p>
                            </div>

                        </div>
                    )}
                </div>
            </section>}

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this post?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeletePost} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Card >
    )
}

export default PostCard
