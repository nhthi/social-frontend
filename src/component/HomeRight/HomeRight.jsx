import React from 'react'
import SearchUser from '../SearchUser/SearchUser'
import PopularUser from './PopularUser'
import { Card } from '@mui/material'

const HomeRight = () => {
  const popularUSer = [1, 1, 1, 1, 1]
  return (
    <div className='pr-5 pt-7'>
      <SearchUser />
      <Card className='p-5 mt-5'>
        <div className='flex justify-between py-5 items-center'>
          <p className='font-semibold opacity-70'>Suggestions for you</p>
          <p className='text-xs font-semibold opacity-95'>View All</p>
        </div>
        <div className=''>
          {popularUSer.map((item, index) => <PopularUser key={index} />)}
        </div>
      </Card>
    </div>
  )
}

export default HomeRight
