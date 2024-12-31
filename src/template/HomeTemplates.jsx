import React from 'react'
import Header from '../components/Header'
import MainHeader from '../components/MainHeader'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Backtotop from '../components/Backtotop'

const HomeTemplates = () => {
  return (
    <>
      <Header />
      <MainHeader />
      {/* Noi Dung Xuất */}
      <div>
        <Outlet />

      </div>
      <Footer />
      <Backtotop />


    </>
  )
}

export default HomeTemplates
