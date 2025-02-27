import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSellers from '../components/BestSellers'
import PolicyAndSupport from '../components/PolicyAndSupport'
import Subscribe from '../components/Subscribe'

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSellers />
      <PolicyAndSupport />
      <Subscribe />
    </div>
  )
}

export default Home