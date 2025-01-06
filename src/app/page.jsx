'use client'

import React from 'react'
import { motion } from 'framer-motion'
import '@fontsource/orbitron/500.css'
import DayCountDown from '@/components/DayCountDown.jsx'
import Header from '@/components/Header.jsx'
import Hero from '@/components/Hero.jsx'
import VideoBg from '@/components/VideoBg.jsx'
import NavButtons from '@/components/NavButtons.jsx'
import Footer from '@/components/Footer.jsx'

export default function App () {

  return (
    <>
      <div>
        <div className='m2:px-5 m2:py-6 p-3 bg-black relative h-max'>
          <NavButtons />
          <motion.div
            className='relative bg-cover bg-center min-h-screen overflow-hidden flex flex-col items-center justify-center rounded-2xl border-2 border-gray-700'
            animate={{
              backgroundPositionY: ['0%', '10%', '0%']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <VideoBg />
            <Header />
            <Hero />
            <DayCountDown />
          </motion.div>
        </div>
        <Footer variant='dark' />
      </div>
    </>
  )
}