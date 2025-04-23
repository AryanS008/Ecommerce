import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottemBanner from '../components/BottemBanner'


const Home = () => {
  return (
    <div className='mt-10'>
        <MainBanner/>
        <Categories/>
        <BestSeller/>
        <BottemBanner/>

    </div>
  )
}

export default Home;