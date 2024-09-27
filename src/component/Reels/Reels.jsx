import React, { useEffect } from 'react'
import UserReelsCard from './UserReelsCard'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReelsAction } from '../../Redux/Reel/reel.action'

const Reels = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const reel = useSelector(store => store.reel)
  useEffect(() => {
    dispatch(getAllReelsAction())
  }, [reel.reel])
  return (
    <div className='mt-5 space-y-5 reels-container'>
      {
        reel.reels.map(item=><UserReelsCard key={item.id} item={item} path={location.pathname}/>)
      }
    </div>
  )
}

export default Reels
