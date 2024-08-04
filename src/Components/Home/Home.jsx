import React from 'react'
import   './Home.module.css'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import ManinSlider from '../mainslider/mainslider'

export default function Home() {
  return <>
  <ManinSlider/>
  <CategorySlider/>
   <FeaturedProducts/>
  </>
    
  
}
