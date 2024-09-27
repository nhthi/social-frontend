import { Avatar, Card, CardHeader } from '@mui/material';
import { red } from '@mui/material/colors';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProfileByUserIdAction, searchUser } from '../../Redux/Auth/auth.action';
import { createChat } from '../../Redux/Message/message.action';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchUser = () => {

  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const  auth = useSelector(store => store.auth)
  const location = useLocation()
  const navigate = useNavigate()


  const handleSearchUser = (e) => {
    setUserName(e.target.value)
    console.log(userName);
    
    dispatch(searchUser(userName))
  }

  const handleClick =  (id) => {
    if(location.pathname === '/message'){
      dispatch(createChat({userId:id}))
    }else{
      navigate(`/profile/${id}`)
    }
  }
  return (
    <div className=''>
      <div className='py-5 relative'>
        <input
          type='text'
          className='outline-none w-[100%] h-12 rounded-full px-5 bg-transparent border-[#3b4054] border'
          placeholder='Search user ...'
          onChange={handleSearchUser}
        />
        {
          userName &&
          <div className='absolute z-10 w-full h-[80vh] top-[4.5rem] cursor-pointer space-y-2 bg-primary overflow-scroll hideScrollBar'>
            {
              auth.searchUser.map((item) => (
                <Card key={item.id} onClick={() => 
                  handleClick(item.id)
                  // setUserName('')
                }>
                  <CardHeader
                    
                    avatar={
                      <Avatar src='https://1.bp.blogspot.com/-HnNPs7wzYiU/YL_CnPsS0oI/AAAAAAAB65A/hiJ1VPaNanABeTpTb7al-x6IHV9aXvbvQCLcBGAsYHQ/s300/4987.jpg' />
                    }
                    titleTypographyProps={{ style: { textAlign: 'left' } }}
                    subheaderTypographyProps={{ style: { textAlign: 'left' } }}
                    title={item.firstName + " " + item.lastName}
                subheader={`@${item.lastName.toLowerCase()}${item.firstName.toLowerCase()}`}
                  />
                </Card>)
              )
            }
          </div>
        }
      </div>
    </div >
  )
}

export default SearchUser
