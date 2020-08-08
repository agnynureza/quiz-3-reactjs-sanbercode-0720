import React from "react"
import {LoginProvider} from './loginContext'
import Navbar from './navbar'
import Routes from './router'


const Main = () =>{
  return(
    <LoginProvider>
      <Navbar/>
      <Routes/>
    </LoginProvider>
  )
}

export default Main;